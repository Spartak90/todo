import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    return value && args && value.length > args ? value.substring(0, args) + '...' : value;
  }
}
