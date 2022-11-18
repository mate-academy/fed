import { Command as Commander } from 'commander';

type AnyObject = {
  [key: string]: any;
}

export interface Controller<O extends AnyObject> {
  (command: Commander, ...args: any[]): O;
}
