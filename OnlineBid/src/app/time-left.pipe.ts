import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeLeft',
  standalone: true
})
export class TimeLeftPipe implements PipeTransform {

  transform(endDate: Date | string | null): string {
    if (!endDate) return 'No time left';

    const now = new Date().getTime();
    const end = new Date(endDate).getTime();
    const timeLeft = end - now;

    if (timeLeft <= 0) return 'Auction ended';

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    let formattedTime = '';
    if (days > 0) {
      formattedTime += `${days} day${days > 1 ? 's' : ''} `;
    }
    if (hours > 0 || days > 0) {
      formattedTime += `${hours} hour${hours > 1 ? 's' : ''} `;
    }
    if (minutes > 0 || hours > 0 || days > 0) {
      formattedTime += `${minutes} minute${minutes > 1 ? 's' : ''} `;
    }
    if (seconds > 0 || minutes > 0 || hours > 0 || days > 0) {
      formattedTime += `${seconds} second${seconds > 1 ? 's' : ''}`;
    }

    return formattedTime;
  }
}
