import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CronExpressionEvaluatorComponent } from './cron-expression-evaluator/cron-expression-evaluator.component';
import { RecurrencePatternGeneratorComponent } from './recurrence-pattern-generator/recurrence-pattern-generator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CronExpressionEvaluatorComponent, RecurrencePatternGeneratorComponent],
  template: `
    <div style="text-align: center; border: 1px solid #cdcdcd;
  padding: 0px 20px 20px 20px;
  margin: 20px;">
    <header style="background-color: #282c34;
  padding: 20px;
  color: white;
  width: 60%;
  margin: 20px auto;">
      <h1>Cron Expression Visualizer</h1>
    </header>
    <main>
      <div class="container">
        <h2>Part 1: Cron Expression Evaluator</h2>
        <app-cron-expression-evaluator></app-cron-expression-evaluator>
        
        <h2>Part 2: Recurrence Pattern Generator</h2>
        <app-recurrence-pattern-generator></app-recurrence-pattern-generator>
      </div>
    </main>
  </div>
  `
})
export class AppComponent {
  title = 'cron_angular';
}
