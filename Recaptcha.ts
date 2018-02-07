import { Directive, AfterViewInit, ElementRef, Input } from '@angular/core';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

declare var grecaptcha;

@Directive({ selector: '[recaptcha]' })

export class Recaptcha implements AfterViewInit {

    constructor(private el: ElementRef) { }

    public loadScript(url: string) {

        // https://stackoverflow.com/a/9659297
        
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length; i--;) {
            if (scripts[i].src == url)
                return;
        }

        // https://stackoverflow.com/a/38473334

        let node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

    ngAfterViewInit() {

        //add script
        this.loadScript("https://www.google.com/recaptcha/api.js?render=explicit");

        // set id and get the key
        this.el.nativeElement.id = "recaptcha";
        this.el.nativeElement.style.height = "74px";
        let sitekey = this.el.nativeElement.getAttribute("sitekey");

        // wait a bit to avoid a race condition
        // the element must be rendered before firing Recaptcha
        setTimeout(function () {
            grecaptcha.render('recaptcha', { 'sitekey': sitekey })
        }, 1000);
    }
}
