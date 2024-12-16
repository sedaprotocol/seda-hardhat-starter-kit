// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@seda-protocol/evm/contracts/interfaces/ISedaCore.sol";
import "@seda-protocol/evm/contracts/libraries/SedaDataTypes.sol";

/**
 * @title MockSedaCore
 * @notice A mock implementation of the ISedaCore interface for testing purposes.
 * @dev This contract simulates the behavior of the actual SedaCore contract,
 *      allowing developers to test their integrations without connecting to the real SEDA network.
 */
contract MockSedaCore is ISedaCore {
    /// @notice Mapping to store results indexed by their request IDs
    mapping(bytes32 => SedaDataTypes.Result) public results;

    /**
     * @notice Posts a new result to the mock SEDA network
     * @dev Simulates the result posting process, storing the result in local storage
     * @param result The result data to be posted
     * @return bytes32 The derived result ID
     */
    function postResult(
        SedaDataTypes.Result calldata result,
        uint64,
        bytes32[] memory
    ) external override returns (bytes32) {
        bytes32 requestId = result.drId;
        if (results[requestId].drId != bytes32(0)) {
            revert ResultAlreadyExists(requestId);
        }
        results[requestId] = result;
        return SedaDataTypes.deriveResultId(result);
    }

    /**
     * @notice Retrieves a result for a given request ID
     * @param requestId The ID of the request whose result is being queried
     * @return SedaDataTypes.Result The stored result data
     * @custom:throws ResultNotFound if no result exists for the given request ID
     */
    function getResult(
        bytes32 requestId
    ) external view returns (SedaDataTypes.Result memory) {
        SedaDataTypes.Result memory result = results[requestId];
        if (result.drId == bytes32(0)) {
            revert ResultNotFound(requestId);
        }
        return result;
    }

    /**
     * @notice Mock implementation of getSedaProver
     * @return address Returns empty address as this is a mock
     */
    function getSedaProver() external view override returns (address) {}

    /**
     * @notice Mock implementation of getRequest
     * @param id The request ID to query
     * @return SedaDataTypes.Request Returns empty request as this is a mock
     */
    function getRequest(
        bytes32 id
    ) external view override returns (SedaDataTypes.Request memory) {}

    /**
     * @notice Posts a new request to the mock SEDA network
     * @dev Simply derives and returns a request ID without storing the request
     * @param inputs The request inputs used to derive the request ID
     * @return bytes32 The derived request ID
     */
    function postRequest(
        SedaDataTypes.RequestInputs calldata inputs
    ) external pure override returns (bytes32) {
        return SedaDataTypes.deriveRequestId(inputs);
    }

    /**
     * @notice Mock implementation of getPendingRequests
     * @param offset Starting position in the list of pending requests
     * @param limit Maximum number of requests to return
     * @return SedaDataTypes.Request[] Returns empty array as this is a mock
     */
    function getPendingRequests(
        uint256 offset,
        uint256 limit
    ) external view override returns (SedaDataTypes.Request[] memory) {}
}
