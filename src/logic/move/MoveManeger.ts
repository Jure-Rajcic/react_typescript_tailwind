import Stack from 'ts-data.stack'
import Command from '../../models/ICommand'

export default class CommandManeger<C extends Command> {
  private undoStack: Stack<C>
  private redoStack: Stack<C>

  constructor() {
    this.undoStack = new Stack<C>()
    this.redoStack = new Stack<C>()
  }

  public executeCommand(command: C): void {
    while (!this.redoStack.isEmpty()) this.redoStack.pop()
    this.undoStack.push(command)
    command.execute()
  }

  public undo(): void {
    if (this.undoStack.isEmpty()) return
    const command: C = this.undoStack.pop()
    this.redoStack.push(command)
    command.undo()
  }

  public redo(): void {
    if (this.redoStack.isEmpty()) return
    const command: C = this.redoStack.pop()
    this.undoStack.push(command)
    command.execute()
  }
}
