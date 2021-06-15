import { FunctionItem, FunctionInputType } from "../model/function-item";

export class Functions {
  static items: FunctionItem[] = [
    {
      title: 'JSON Beautifier',
      subtitle: 'Make your JSON pretty',
      author: 'UtilityBelt',
      tags: 'json, beautifier, formatter, javascript',
      inputs: [
        {
          label: 'Unformatted JSON',
          type: FunctionInputType.TEXTAREA,
          value: '{}',
        },
      ],
      function: (log, print) => {
        return (arr) => {
          try {
            let input = JSON.parse(arr[0]);
            print(JSON.stringify(input, null, 2));
            log('SUCCESS');
          } catch (e) {
            log(`ERROR ${new Date()}: ${e}`);
          }
          return '';
        };
      },
    },
    {
      title: 'String Generator',
      subtitle: 'Generate strings of any length',
      author: 'UtilityBelt',
      tags: 'string, string length, length, text, filler',
      inputs: [
        {
          label: 'Desired Length',
          type: FunctionInputType.NUMBER,
          value: '256',
        },
      ],
      function: (log, print) => {
        return (arr) => {
          try {
            let input = Number(JSON.parse(arr[0]));
            let fillMe = [];
            fillMe[input] = 'a';
            fillMe.fill('a');
            print(fillMe.join(''));
            log('SUCCESS');
          } catch (e) {
            log(`ERROR ${new Date()}: ${e}`);
          }
          return '';
        };
      },
    },

    {
      title: 'Password Generator',
      subtitle: 'Generate passwords of any length',
      author: 'UtilityBelt',
      tags: 'password, password generator, generator, random',
      inputs: [
        {
          label: 'Desired Length',
          type: FunctionInputType.NUMBER,
          value: '16',
        },
        {
          label: 'Include Numbers?',
          type: FunctionInputType.YES_NO,
          value: 'YES',
        },
      ],
      function: (log, print) => {
        return (arr) => {
          try {
            let lengthInput = Number(JSON.parse(arr[0]));
            let includeNumbers = arr[1] === 'YES';
            let result = '';
            let candidateCharacters = [
              'a',
              'b',
              'c',
              'd',
              'e',
              'f',
              'g',
              'h',
              'i',
              'j',
              'k',
              'l',
              'm',
              'n',
              'o',
              'p',
              'q',
              'r',
              's',
              't',
              'u',
              'v',
              'w',
              'x',
              'y',
              'z',
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '0',
            ];
            let randomIndexFinder = (max) => Math.floor(Math.random() * max);
            if (!includeNumbers) {
              candidateCharacters = candidateCharacters.filter(
                (char) => char.toUpperCase() !== char.toLowerCase()
              );
            }
            for (let i = 0; i < lengthInput; i++) {
              let randomIndex = randomIndexFinder(candidateCharacters.length);
              let randomCharacter = candidateCharacters[randomIndex];
              if (randomIndexFinder(2) === 0) {
                randomCharacter = randomCharacter.toUpperCase();
              }
              result += randomCharacter;
            }
            print(result);
            log('SUCCESS');
          } catch (e) {
            log(`ERROR ${new Date()}: ${e}`);
          }
          return '';
        };
      },
    },
  ];
}
