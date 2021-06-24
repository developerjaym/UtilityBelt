import { CustomFunctionItem, FunctionInputType } from '../model/function-item';

export class CustomFunctions {
  static items: CustomFunctionItem[] = [
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
      function:
        "try { let input = JSON.parse(paramArray[0]); print(JSON.stringify(input, null, 2)); log('SUCCESS'); } catch (e) { log('ERROR ' + new Date() + ' ' + e); }  return '';",
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
      function:
        "try { let input = Number(JSON.parse(paramArray[0])); let fillMe = []; fillMe[input] = 'a'; fillMe.fill('a'); print(fillMe.join('')); log('SUCCESS'); } catch (e) { log('ERROR ' + new Date() + ' ' + e); } return '';",
    },

    {
      title: 'Password Generator',
      subtitle: 'Generate passwords of any length',
      author: 'UtilityBelt',
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
      tags: 'password, password generator, generator, random',
      function:
        " try {let lengthInput = Number(JSON.parse(paramArray[0]));let includeNumbers = paramArray[1] === 'YES';let result = '';let candidateCharacters = [  'a',  'b',  'c',  'd',  'e',  'f',  'g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0',];let randomIndexFinder = (max) => Math.floor(Math.random() * max);if (!includeNumbers) {  candidateCharacters = candidateCharacters.filter(    (char) => char.toUpperCase() !== char.toLowerCase()  );}for (let i = 0; i < lengthInput; i++) {  let randomIndex = randomIndexFinder(candidateCharacters.length);  let randomCharacter = candidateCharacters[randomIndex];  if (randomIndexFinder(2) === 0) {    randomCharacter = randomCharacter.toUpperCase();  }  result += randomCharacter;}print(result);  log('SUCCESS'); } catch (e) { log('ERROR ' + new Date() + ' ' + e); } return '';",
    },

    {
      title: 'Base64 Converter',
      subtitle: 'Convert to and from Base64',
      author: 'UtilityBelt',
      inputs: [
        {
          label: 'String to convert',
          type: FunctionInputType.TEXTAREA,
          value: 'username:password',
        },
        {
          label: 'Convert TO Base64?',
          type: FunctionInputType.YES_NO,
          value: 'YES',
        },
      ],
      tags: 'base64, base 64, base',
      function:
        " try {let toBase64 = paramArray[1] === 'YES';let result =  toBase64 ? btoa(paramArray[0]) : atob(paramArray[0]);print(result);  log('SUCCESS'); } catch (e) { console.error(e); } print('');",
    },
    {
      title: 'XML Beautifier',
      subtitle: 'Make your XML pretty',
      author: 'UtilityBelt',
      inputs: [
        {
          label: 'Unformatted XML',
          type: FunctionInputType.TEXTAREA,
          value: '',
        },
        {
          label: 'Use tabs rather than spaces?',
          type: FunctionInputType.YES_NO,
          value: 'NO',
        },
      ],
      tags: 'xml, beautifier, formatter',
      function:
        "xml = paramArray[0]; \nvar reg = /(>)\\s*(<)(\\/*)/g;\n        var wsexp = / *(.*) +\\n/g;\n        var contexp = /(<.+>)(.+\\n)/g;\n        xml = xml.replace(reg, '$1\\n$2$3').replace(wsexp, '$1\\n').replace(contexp, '$1\\n$2');\n        var pad = 0;\n        var formatted = '';\n        var lines = xml.split('\\n');\n        var indent = 0;\n        var lastType = 'other';\n        \n        var transitions = {\n            'single->single': 0,\n            'single->closing': -1,\n            'single->opening': 0,\n            'single->other': 0,\n            'closing->single': 0,\n            'closing->closing': -1,\n            'closing->opening': 0,\n            'closing->other': 0,\n            'opening->single': 1,\n            'opening->closing': 0,\n            'opening->opening': 1,\n            'opening->other': 1,\n            'other->single': 0,\n            'other->closing': -1,\n            'other->opening': 0,\n            'other->other': 0\n        };\n\n        for (var i = 0; i < lines.length; i++) {\n            var ln = lines[i];\n\n            if (ln.match(/\\s*<\\?xml/)) {\n                formatted += ln + '\\n';\n                continue;\n            }\n\n            var single = Boolean(ln.match(/<.+\\/>/)); \n            var closing = Boolean(ln.match(/<\\/.+>/)); \n            var opening = Boolean(ln.match(/<[^!].*>/)); \n            var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';\n            var fromTo = lastType + '->' + type;\n            lastType = type;\n            var padding = '';\n\n            indent += transitions[fromTo];\n            for (var j = 0; j < indent; j++) {\n                padding += paramArray[1] === 'YES' ? '\\t' : '    ';\n            }\n            if (fromTo == 'opening->closing') {\n                formatted = formatted.substr(0, formatted.length - 1) + ln + '\\n'; \n            }\n            else {\n                formatted += padding + ln + '\\n';\n           }\n        }\n\n        print(formatted.trim());",
    },
    {
      title: 'Regex Checker',
      subtitle: 'Check your regexes',
      tags: 'regex',
      author: 'UtilityBelt',
      function:
        "let re = new RegExp(paramArray[0], 'g');\nconst text = paramArray[1];\nlet array1;\nlet output = '';\nwhile ((array1 = re.exec(text)) !== null) {\n output += 'Match: ' + array1[0] + '\\n Capture: ' + array1[1] + '\\n';\n}\nprint(output);",
      inputs: [
        {
          label: 'Regex pattern',
          type: FunctionInputType.TEXTFIELD,
          value: 'h(o)',
        },
        {
          label: 'Text',
          type: FunctionInputType.TEXTAREA,
          value: 'how now brown cow',
        },
      ],
    },
    {
      title: 'JWT Decoder',
      subtitle: 'Just like JWT.IO but worse',
      tags: 'jwt, decode, decoder, token',
      author: 'UtilityBelt',
      function:
        "const parts = paramArray[0].split('.');\nconst prettyPrint = (str) => JSON.stringify(JSON.parse(atob(str)), null, 2);\nconst top = prettyPrint(parts[0]);\nconst bottom = prettyPrint(parts[1]);\nprint('HEADER:\\n' + top + '\\nDATA:\\n' + bottom);",
      inputs: [
        {
          label: 'JWT',
          type: FunctionInputType.TEXTAREA,
          value: '',
        },
      ],
    },
  ];
}
