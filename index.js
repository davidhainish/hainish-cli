#!/usr/bin/env node

import asciichart from 'asciichart';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';

let name;

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
      'Welcome to the Hainish command line. \n'
    );
  
    await sleep();
    rainbowTitle.stop();
  
    console.log(`
      ${chalk.bgBlue('LET\'S DRAW!')} 
    `);
}

async function askName() {
    const answers = await inquirer.prompt({
      name: 'name',
      type: 'input',
      message: 'What is your name?',
      default() {
        return 'Player';
      },
    });
  
    name = answers.name;
}

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: `What would you like me to draw ${name}? \n`,
        choices: [
          'Sine',
          'Cosine',
          'Suprise me 🙂',
        ],
    });
    return drawChart(answers.question_1);
}

async function drawChart(chartType) {
    let config = {
        colors: [
            asciichart.blue,
            asciichart.green,
            asciichart.red,
            asciichart.default, // default color
        ]
    }

    let s0 = new Array(120);
    switch (chartType) {
        case 'Suprise me 🙂':
            console.clear();
            figlet(`I'm a sausage!`, (err, data) => {
                console.log(gradient.pastel.multiline(data) + '\n');
                console.log(`${chalk.redBright('Sizzle sizzle sizzle')} 🔥🔥🔥`);
                process.exit(0);
            });
            break;
        case 'Cosine':
            for (let i = 0; i < s0.length; i++) {
                s0[i] = 15 * Math.cos(i * ((Math.PI * 4) / s0.length));
            }
            console.log (asciichart.plot(s0, config))
            break;
        case 'Sine':
        default:
            for (let i = 0; i < s0.length; i++) {
                s0[i] = 15 * Math.sin(i * ((Math.PI * 4) / s0.length));
            }
            console.log (asciichart.plot(s0, config))
            break;
    }
}


// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();