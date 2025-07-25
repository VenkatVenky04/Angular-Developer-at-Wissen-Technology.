import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cron-expression-evaluator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cron-expression-evaluator.component.html',
  styleUrls: ['./cron-expression-evaluator.component.css']
})
export class CronExpressionEvaluatorComponent {
  cronExpression: string = '';
  // showParsed: boolean = false;

  cronFields = {
    seconds: '',
    minutes: '',
    hours: '',
    days: '',
    month: '',
    dayOfWeek: ''
  };

  activeFields = {
    seconds: false,
    minutes: false,
    hours: false,
    days: false,
    month: false,
    dayOfWeek: false
  };

  /**
   * Called on every change in the cron input
   */
  onCronChange(value: string): void {
    const cleaned = value.trim().replace(/\s+/g, ' ');
    const parts = cleaned.split(' ');
  
    // Only accept exactly 6 parts
    if (parts.length !== 6) {
      this.resetFields();
      // this.showParsed = false;   // hide parsed output for invalid input
      return;
    }
  
    // this.showParsed = true; // valid, show parsed output
  
    const [seconds, minutes, hours, days, month, dayOfWeek] = parts;
  
    this.cronFields = { seconds, minutes, hours, days, month, dayOfWeek };
  
    this.activeFields = {
      seconds: seconds !== '*',
      minutes: minutes !== '*',
      hours: hours !== '*',
      days: days !== '*',
      month: month !== '*',
      dayOfWeek: dayOfWeek !== '*'
    };
  }

  /**
   * Resets all fields to default (*) and inactive
   */
  resetFields(): void {
    this.cronFields = {
      seconds: '',
      minutes: '',
      hours: '',
      days: '',
      month: '',
      dayOfWeek: ''
    };

    this.activeFields = {
      seconds: false,
      minutes: false,
      hours: false,
      days: false,
      month: false,
      dayOfWeek: false
    };
  }
}
