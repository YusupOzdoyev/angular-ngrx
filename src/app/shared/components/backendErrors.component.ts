import { Component, Input, OnInit } from "@angular/core";
import { BackendErrorsInterface } from "../types/backendErrors.interface";
import { NgFor } from "@angular/common";

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backendErrors.component.html',
  standalone: true,
  imports: [NgFor],
})

export class BackendErrors implements OnInit {
  @Input() backendErrors: BackendErrorsInterface = {};

  errorMessages: string[] = [];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join(' ');
      return `${name} ${messages}`;
    });
  };
};