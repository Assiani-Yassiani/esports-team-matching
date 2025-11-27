import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resume2',
  templateUrl: './resume2.component.html',
  styleUrl: './resume2.component.scss'
})
export class Resume2Component {
  myForm: FormGroup;
  options: any[];

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      selectedOption: [null]
    });

    this.options = [
      { label: 'Select an option', value: null },
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' }
    ];
  }

  ngOnInit(): void { }

  onSubmit(): void {
    console.log('Form submitted with value:', this.myForm.value.selectedOption);
  }

}
