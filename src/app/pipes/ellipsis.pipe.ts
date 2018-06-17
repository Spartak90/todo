import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
  transform(value: string, maxLength?: number): any {
    return value && maxLength && value.length > maxLength ? value.substring(0, maxLength) + '...' : value;
  }
}
