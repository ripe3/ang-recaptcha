# easy-gcaptcha
Easy Google Recaptcha implementation for Angular 2+

## Usage

- Add `Recaptcha.ts` to your project

- Import the `Recaptcha` class in your `app.module.ts`

```Typescript
import { Recaptcha } from './Recaptcha';
    ...    
@NgModule({
  declarations: [
  ...
  Recaptcha,
  ...
]
```
    
- Add the `recaptcha` attribute to a `<div>` where you want to show the Recaptcha box alongside its parameters

```HTML
<div recaptcha data-key="YOUR_SITE_KEY" data-position="POSITION" data-type="TYPE"></div>
```
    
- YOUR_SITE_KEY: Key provided on reCaptcha's admin panel.
- POSITION: Where reCaptcha should be placed. Accepts: `bottomright` (default), `bottomleft` or `inline` (can be managed with css). Only works for `invisible` and `v3`.
- TYPE: Type of your reCaptcha. Accepts: `v2` (default), `v3` and `invisible`.
    

## Getting result inside your module

- Import `Recaptcha`

- Add this snipet before your constructor but inside the main class

```Typescript
@ViewChild(Recaptcha) recaptcha;
```
    
- Getting result with `v2` and `invisible`

```Typescript
recaptcha.getResponse(function(token){ 
   ... 
});
```
    
- Getting result with `v3` (see https://developers.google.com/recaptcha/docs/v3#actions to what this `action` parameters is)

```Typescript
recaptcha.getResponse(action, function(token){ 
  ... 
});
```
    
<b>Done!</b>
    
