// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@seda-protocol/contracts/src/SedaProver.sol";

/**
 * @title SedaProverMock
 * @notice This mock contract is used for testing purposes and simulates the behavior of the SedaProver contract.
 * It allows the creation of data requests and the manual setting of data results for testing interactions
 * with the SEDA network.
 */
contract SedaProverMock {
    // Mapping to store data results by their corresponding data request IDs.
    mapping(bytes32 => SedaDataTypes.DataResult) public dataResults;

    // Array to track all posted request IDs (optional, useful for reference or testing).
    bytes32[] public requestIds;

    /**
     * @notice Simulates posting a data request to the SEDA network.
     * @param inputs The inputs required for creating a data request, including the WASM binary ID and memo.
     * @return dataRequestId The unique ID of the created data request (generated via keccak256 hash).
     */
    function postDataRequest(
        SedaDataTypes.DataRequestInputs memory inputs
    ) public returns (bytes32) {
        // Generate a unique data request ID using the binary ID and memo.
        // Note: this is an over-simplification over how data requests IDs are generated.
        bytes32 dataRequestId = keccak256(
            abi.encodePacked(inputs.dr_binary_id, inputs.memo)
        );

        // Store the new data request ID for reference.
        requestIds.push(dataRequestId);

        return dataRequestId;
    }

    /**
     * @notice Manually sets the data result for a specific data request.
     * @dev This function is useful for mocking the result of a data request during testing.
     * @param _requestId The ID of the data request for which the result is being set.
     * @param _consensus Whether the data result reached consensus (true/false).
     * @param _result The actual result of the data request, stored as bytes.
     */
    function setDataResult(
        bytes32 _requestId,
        bool _consensus,
        bytes memory _result
    ) public {
        dataResults[_requestId] = SedaDataTypes.DataResult({
            version: "0.0.1",
            dr_id: _requestId,
            consensus: _consensus,
            exit_code: 0,
            result: _result,
            block_height: uint64(block.number),
            gas_used: 0,
            payback_address: "",
            seda_payload: ""
        });
    }

    /**
     * @notice Retrieves the data result for a specific data request.
     * @param _requestId The ID of the data request whose result is being fetched.
     * @return The stored `SedaDataTypes.DataResult` for the given data request ID.
     */
    function getDataResult(
        bytes32 _requestId
    ) public view returns (SedaDataTypes.DataResult memory) {
        require(dataResults[_requestId].dr_id != bytes32(0), "Data result not found");
        return dataResults[_requestId];
    }
}
