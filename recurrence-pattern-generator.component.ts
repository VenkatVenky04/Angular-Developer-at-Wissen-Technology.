import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recurrence-pattern-generator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recurrence-pattern-generator.component.html',
  styleUrls: ['./recurrence-pattern-generator.component.css']
})
export class RecurrencePatternGeneratorComponent {
  // Add this line to expose Object to the template
  pattern: string = 'daily';
  time: string = '08:00';
  date: string = '1';
  weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  selectedDays: { [key: string]: boolean } = {
    monday: false, tuesday: false, wednesday: false,
    thursday: false, friday: false, saturday: false, sunday: false
  };

  description: string = '';

  ngOnInit() {
    this.generateDescription();
  }

  onPatternChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.pattern = value;
  
    // Reset other selections when pattern changes
    this.date = '1';
    this.time = '08:00';
    for (const day in this.selectedDays) {
      this.selectedDays[day] = false;
    }
    this.generateDescription();
  }
  
  onTimeChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.time = value;
    this.generateDescription();
  }
  
  onDateChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.date = value;
    this.generateDescription();
  }
  

  toggleDay(day: string) {
    this.selectedDays[day] = !this.selectedDays[day];
    this.generateDescription();
  }

  generateDescription() {
    if (!this.time) {
      this.description = 'Please select a time.';
      return;
    }

    switch (this.pattern) {
      case 'daily':
        this.description = `Runs every day at ${this.formatTime(this.time)}.`;
        break;
      case 'weekly':
        const selected = this.getSelectedWeekdays();
        if (selected.length > 0) {
          const formattedDays = selected.map(this.capitalize).join(', ').replace(/, ([^,]*)$/, ' and $1');
          this.description = `Runs every week on ${formattedDays} at ${this.formatTime(this.time)}.`;
        } else {
          this.description = 'Please select at least one day.';
        }
        break;
      case 'monthly':
        this.description = `Runs every month on the ${this.ordinalSuffix(this.date)} at ${this.formatTime(this.time)}.`;
        break;
      default:
        this.description = '';
    }
  }

  getSelectedWeekdays(): string[] {
    return Object.keys(this.selectedDays).filter(day => this.selectedDays[day]);
  }

  capitalize(day: string): string {
    return day.charAt(0).toUpperCase() + day.slice(1);
  }

  ordinalSuffix(n: string | number): string {
    const num = parseInt(n as string, 10);
    if (isNaN(num)) return '';
    const j = num % 10, k = num % 100;
    if (j == 1 && k != 11) return num + "st";
    if (j == 2 && k != 12) return num + "nd";
    if (j == 3 && k != 13) return num + "rd";
    return num + "th";
  }

  formatTime(time: string): string {
    const [hour, minute] = time.split(':');
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  }

/*

Create Recurrence Pattern Description Module that has the following functionalities
Complete the following functionalities.

1 .Renders recurrence pattern select field

2 .Shows daily pattern description with the selected time

Example:
Input:
Pattern: Daily
Time: 10:30 AM
Output: Runs every day at 10:30.

3. Displays weekly pattern description with selected days and time

Example:
Input:
Pattern: Weekly
Days Selected: Monday, Friday
Time: 08:30 AM
Output: Runs every week on Monday, Friday at 08:30.

4. Falls back to a generic weekly description when no days are selected

Example:
Input:
Pattern: Weekly
Days Selected: 'None'
Time: 06:30 PM
Output: Runs every week at 18:30.

5. Shows monthly pattern description with selected date and time

Example:
Input:
Pattern: Monthly
Date Selected: 15
Time: 09:00 AM
Output: Runs every month on the 15th day at 09:00.

6. Handles ordinal suffixes correctly (e.g., 1st, 2nd, 3rd, 11th, etc.)

NOTE: You are free to implement the task in any other way as well but shouldn't be hardcoded.

*/

}
