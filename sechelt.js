/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-CA, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).  

const languageStrings = {
    'en': {
        translation: {
            FACTS: [
                'The District Municipality of Sechelt is located on the lower Sunshine Coast of British Columbia.',
                'Sechelt is approximately 50 km northwest of Vancouver
                'Sechelt is accessible from mainland British Columbia by a 40-minute ferry trip between Horseshoe Bay and Langdale.',
                'Sechlet is a 25-minute drive from Langdale along Highway 101.',
                'Highway 101 also known as the Sunshine Coast Highway.',
                'The name Sechelt is derived from the name of the First Nations people who first settled the area thousands of years ago.',
                'The original Village of Sechelt was incorporated on February 15, 1956.',
                'Sechelt later expanded its boundaries in 1986 with the inclusion of a number of adjacent unincorporated areas.',
                'The District of Sechelt encompasses some 39.71 square km (15.33 sq mi) at the isthmus of the Sechelt Peninsula.',
                'The 2006 Canadian census placed its population at 8,455.',
                'For thousands of years, the Sechelt people practiced a hunting and gathering subsistence strategy, making extensive use of the natural food resources located around Sechelt, and its strategic location for access into the Sechelt Inlet.',
                'Europeans began settling in Sechelt in the 1860s and by the 1880s, it had become an active centre of the logging and fishing industries.',
                'The natural beauty of the Sunshine Coast soon attracted tourists, who arrived at the wharves at Trail Bay via steamship.',
            ],
            SKILL_NAME: 'Sechelt Information',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me a space fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
    'en-US': {
        translation: {
            FACTS: [
                'The District Municipality of Sechelt is located on the lower Sunshine Coast of British Columbia.',
                'Sechelt is approximately 50 km northwest of Vancouver
                'Sechelt is accessible from mainland British Columbia by a 40-minute ferry trip between Horseshoe Bay and Langdale.',
                'Sechlet is a 25-minute drive from Langdale along Highway 101.',
                'Highway 101 also known as the Sunshine Coast Highway.',
                'The name Sechelt is derived from the name of the First Nations people who first settled the area thousands of years ago.',
                'The original Village of Sechelt was incorporated on February 15, 1956.',
                'Sechelt later expanded its boundaries in 1986 with the inclusion of a number of adjacent unincorporated areas.',
                'The District of Sechelt encompasses some 39.71 square km (15.33 sq mi) at the isthmus of the Sechelt Peninsula.',
                'The 2006 Canadian census placed its population at 8,455.',
                'For thousands of years, the Sechelt people practiced a hunting and gathering subsistence strategy, making extensive use of the natural food resources located around Sechelt, and its strategic location for access into the Sechelt Inlet.',
                'Europeans began settling in Sechelt in the 1860s and by the 1880s, it had become an active centre of the logging and fishing industries.',
                'The natural beauty of the Sunshine Coast soon attracted tourists, who arrived at the wharves at Trail Bay via steamship.',
            ],
            SKILL_NAME: 'American Sechelt Information',
        },
    },
    'en-CA': {
        translation: {
            FACTS: [
                'The District Municipality of Sechelt is located on the lower Sunshine Coast of British Columbia.',
                'Sechelt is approximately 50 km northwest of Vancouver
                'Sechelt is accessible from mainland British Columbia by a 40-minute ferry trip between Horseshoe Bay and Langdale.',
                'Sechlet is a 25-minute drive from Langdale along Highway 101.',
                'Highway 101 also known as the Sunshine Coast Highway.',
                'The name Sechelt is derived from the name of the First Nations people who first settled the area thousands of years ago.',
                'The original Village of Sechelt was incorporated on February 15, 1956.',
                'Sechelt later expanded its boundaries in 1986 with the inclusion of a number of adjacent unincorporated areas.',
                'The District of Sechelt encompasses some 39.71 square km (15.33 sq mi) at the isthmus of the Sechelt Peninsula.',
                'The 2006 Canadian census placed its population at 8,455.',
                'For thousands of years, the Sechelt people practiced a hunting and gathering subsistence strategy, making extensive use of the natural food resources located around Sechelt, and its strategic location for access into the Sechelt Inlet.',
                'Europeans began settling in Sechelt in the 1860s and by the 1880s, it had become an active centre of the logging and fishing industries.',
                'The natural beauty of the Sunshine Coast soon attracted tourists, who arrived at the wharves at Trail Bay via steamship.',
            ],
            SKILL_NAME: 'Canadian Sechelt Information',
        },
    },
    'de': {
        translation: {
            FACTS: [
                'The District Municipality of Sechelt is located on the lower Sunshine Coast of British Columbia.',
                'Sechelt is approximately 50 km northwest of Vancouver
                'Sechelt is accessible from mainland British Columbia by a 40-minute ferry trip between Horseshoe Bay and Langdale.',
                'Sechlet is a 25-minute drive from Langdale along Highway 101.',
                'Highway 101 also known as the Sunshine Coast Highway.',
                'The name Sechelt is derived from the name of the First Nations people who first settled the area thousands of years ago.',
                'The original Village of Sechelt was incorporated on February 15, 1956.',
                'Sechelt later expanded its boundaries in 1986 with the inclusion of a number of adjacent unincorporated areas.',
                'The District of Sechelt encompasses some 39.71 square km (15.33 sq mi) at the isthmus of the Sechelt Peninsula.',
                'The 2006 Canadian census placed its population at 8,455.',
                'For thousands of years, the Sechelt people practiced a hunting and gathering subsistence strategy, making extensive use of the natural food resources located around Sechelt, and its strategic location for access into the Sechelt Inlet.',
                'Europeans began settling in Sechelt in the 1860s and by the 1880s, it had become an active centre of the logging and fishing industries.',
                'The natural beauty of the Sunshine Coast soon attracted tourists, who arrived at the wharves at Trail Bay via steamship.',
            ],
            SKILL_NAME: 'Weltraumwissen auf Deutsch',
            GET_FACT_MESSAGE: 'Hier sind deine Fakten: ',
            HELP_MESSAGE: 'Du kannst sagen, „Nenne mir einen Fakt über den Weltraum“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the Sechelt Information list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

