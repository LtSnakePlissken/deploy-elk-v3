// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import './pool/IElkV3PoolImmutables.sol';
import './pool/IElkV3PoolState.sol';
import './pool/IElkV3PoolDerivedState.sol';
import './pool/IElkV3PoolActions.sol';
import './pool/IElkV3PoolOwnerActions.sol';
import './pool/IElkV3PoolEvents.sol';

/// @title The interface for a Elk V3 Pool
/// @notice A Elk pool facilitates swapping and automated market making between any two assets that strictly conform
/// to the ERC20 specification
/// @dev The pool interface is broken up into many smaller pieces
interface IElkV3Pool is
    IElkV3PoolImmutables,
    IElkV3PoolState,
    IElkV3PoolDerivedState,
    IElkV3PoolActions,
    IElkV3PoolOwnerActions,
    IElkV3PoolEvents
{

}
