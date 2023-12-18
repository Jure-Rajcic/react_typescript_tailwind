import React from 'react'
import IGameComponent from './IGameComponent'
import Wall from './Wall'
import Tile from './Tile'
import Box from './Box'
import Player from './Player'
import Target from './Target'

export default class GameComponentFactory {
  public static createGameComponent(identifier: string): React.FC<IGameComponent> {
    switch (identifier) {
      case ' ':
        return Tile
      case '#':
        return Wall
      case '$':
        return Box
      case '.':
        return Target
      case '@':
        return Player
      default:
        throw new Error(`Unknown game component identifier ${identifier}`)
    }
  }
}
