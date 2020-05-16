import { Command as Commander } from 'commander';

export interface Controller<O extends {}> {
  (command: Commander, ...args: any[]): O;
}
