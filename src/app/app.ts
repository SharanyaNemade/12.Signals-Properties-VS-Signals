import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Signals } from './signals/signals';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Signals],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Angular21');

}
