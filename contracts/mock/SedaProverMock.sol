// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@seda-protocol/contracts/src/SedaProver.sol";

contract SedaProverMock {
    mapping(bytes32 => SedaDataTypes.DataResult) public dataResults;
    bytes32[] public requestIds;

    function postDataRequest(
        SedaDataTypes.DataRequestInputs memory inputs
    ) public returns (bytes32) {
        bytes32 dataRequestId = keccak256(
            abi.encodePacked(inputs.dr_binary_id, inputs.memo, block.timestamp)
        );
        requestIds.push(dataRequestId);
        return dataRequestId;
    }

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

    function getDataResult(
        bytes32 _requestId
    ) public view returns (SedaDataTypes.DataResult memory) {
        return dataResults[_requestId];
    }
}
