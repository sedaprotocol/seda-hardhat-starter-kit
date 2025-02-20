// SPDX-License-Identifier: MIT
/**
 * NOTICE: This is an example contract to demonstrate SEDA network functionality.
 * It is for educational purposes only and should not be used in production.
 */

pragma solidity 0.8.25;

import "@seda-protocol/evm/contracts/interfaces/ISedaCore.sol";
import "@seda-protocol/evm/contracts/libraries/SedaDataTypes.sol";

/**
 * @title PriceFeed
 * @notice An example showing how to create and interact with SEDA network requests.
 * @dev This contract demonstrates basic SEDA request creation and result fetching.
 */
contract PriceFeed {
    /// @notice Instance of the SedaCore contract
    ISedaCore public immutable sedaCore;

    /// @notice ID of the request WASM binary on the SEDA network
    bytes32 public immutable oracleProgramId;

    /// @notice ID of the most recent request
    bytes32 public requestId;

    /// @notice Thrown when trying to fetch results before any request is transmitted
    error RequestNotTransmitted();

    /**
     * @notice Sets up the contract with SEDA network parameters
     * @param _sedaCoreAddress Address of the SedaCore contract
     * @param _oracleProgramId ID of the WASM binary for handling requests
     */
    constructor(address _sedaCoreAddress, bytes32 _oracleProgramId) {
        sedaCore = ISedaCore(_sedaCoreAddress);
        oracleProgramId = _oracleProgramId;
    }

    /**
     * @notice Creates a new ETH-USDC price request on the SEDA network
     * @dev Demonstrates how to structure and send a request to SEDA
     * @return The ID of the created request
     */
    function transmit() public returns (bytes32) {
        SedaDataTypes.RequestInputs memory inputs = SedaDataTypes.RequestInputs(
                oracleProgramId, // execProgramId (Execution WASM binary ID)
                bytes("eth-usdc"), // execInputs (Inputs for Execution WASM)
                20000000000000, // execGasLimit
                oracleProgramId, // tallyProgramId (same as execProgramId in this example)
                hex"00", // tallyInputs
                10000000000000, // tallyGasLimit
                1, // replicationFactor (number of required DR executors)
                hex"00", // consensusFilter (set to `None`)
                2000, // gasPrice (SEDA tokens per gas unit)
                abi.encodePacked(block.number) // memo (Additional public info)
            );

        requestId = sedaCore.postRequest(inputs);
        return requestId;
    }

    /**
     * @notice Retrieves the result of the latest request
     * @dev Shows how to fetch and interpret SEDA request results
     * @return The price as uint128, or 0 if no consensus was reached
     */
    function latestAnswer() public view returns (uint128) {
        if (requestId == bytes32(0)) revert RequestNotTransmitted();

        SedaDataTypes.Result memory result = sedaCore.getResult(requestId);

        if (result.consensus) {
            return uint128(bytes16(result.result));
        }

        return 0;
    }
}
