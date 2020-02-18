import "@testing-library/jest-dom/extend-expect";
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from "react";
import { render } from "@testing-library/react";
import initialiseChessBoard from "../../helpers/board-initialiser.js";
import Elephant from "../../pieces/elephant.js";
import King from "../../pieces/king.js";
import Knight from "../../pieces/knight.js";
import Pawn from "../../pieces/pawn.js";
import Rook from "../../pieces/rook.js";
import Advisor from "../../pieces/advisor.js";
import Canon from "../../pieces/canon.js";

describe("getAllMoves", () => {
  let squares;
  beforeEach(() => {
    squares = initialiseChessBoard();
  });

  function movesFromPos(pos) {
    return squares[pos].getAllMoves(squares, pos);
  }

  test("Advisor", () => {
    expect(movesFromPos(84)).toEqual([76]);
    squares[76] = new Advisor(1);
    expect(movesFromPos(84)).toEqual([]);
    squares[76] = new Advisor(2);
    expect(movesFromPos(84)).toEqual([76]);
  });
  test("Pawn", () => {
    // expect(movesFromPos(54)).toEqual([45]);

    // no friendly fire
    squares[63] = new Pawn(1);
    expect(movesFromPos(63)).toEqual([]);

    // can't move backwards
    squares[65] = new Pawn(2);
    expect(movesFromPos(65)).toEqual([64, 66, 74]);

    squares[0] = new Pawn(1);
    expect(movesFromPos(0)).toEqual([1]);
  });
  test("King", () => {
    expect(movesFromPos(85)).toEqual([76]);
    // TODO: kings can't see each other
    // squares[75] = new King(1);
    // squares[13] = new King(2);
    // expect(movesFromPos(13)).toEqual([14]);
  });
  // test("canon", () => {
  //   expect(movesFromPos(64)).toEqual([
  //     73,
  //     63,
  //     65,
  //     66,
  //     67,
  //     68,
  //     69,
  //     55,
  //     46,
  //     37,
  //     28,
  //     2
  //   ]);
  //   // squares[65] = new Canon(1);
  // });
});
