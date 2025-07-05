import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitMessage = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  async onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitMessage = 'Envoi en cours...';

      try {
        // Configuration selon votre preset EmailJS
        const templateParams = {
          title: "Nouveau message de contact Professionnel",
          name: this.contactForm.value.email,
          time: new Date().toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          message: this.contactForm.value.message,
          email: this.contactForm.value.email
        };

        const response = await emailjs.send(
          environment.emailjs.serviceId,
          environment.emailjs.templateId,
          templateParams,
          environment.emailjs.publicKey
        );

        this.submitMessage = 'Message envoyé avec succès !';
        this.contactForm.reset();
      } catch (error) {
        console.error('Erreur lors de l\'envoi:', error);
        this.submitMessage = 'Erreur lors de l\'envoi du message. Veuillez réessayer.';
      } finally {
        this.isSubmitting = false;
        setTimeout(() => {
          this.submitMessage = '';
        }, 5000);
      }
    }
  }
}
