# ang-recaptcha
Google Recaptcha implementation for Angular 2+

## Usage

- Add `Recaptcha.ts` to your project

- Import the `Recaptcha` class in your `app.module.ts`

 <b></b>

    import { Recaptcha } from './Recaptcha';
    
    ...
    
    @NgModule({
      declarations: [
      ...
      Recaptcha,
      ...
    ]
    
- Add the `recaptcha` attribute to a `<div>`

<b></b>

    <div recaptcha sitekey="YOUR_SITE_KEY"></div>
    

## Getting result inside your module

- Add before `@Component`

<b></b>

    declare var grecaptcha:any;
    
- To get the result

<b></b>

    let result = grecaptcha.getResponse();
    
<b>Done!</b>
    
