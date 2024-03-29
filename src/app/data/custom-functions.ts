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
    {
      title: 'Create QR Code',
      subtitle: 'Sometimes it is useful',
      tags: 'qr, qr code',
      author: 'UtilityBelt',
      function:
        'let img = document.createElement("img");\nimg.setAttribute("src", `https://api.qrserver.com/v1/create-qr-code/?size=${paramArray[1]}x${paramArray[1]}&data=${paramArray[0].trim()}`);\nimg.setAttribute("width", paramArray[1]);\nimg.setAttribute("height", paramArray[1]);\noutputsElement.innerHTML = "";\noutputsElement.appendChild(img);',
      inputs: [
        {
          label: 'Data (usually a URL)',
          type: FunctionInputType.TEXTFIELD,
          value: '',
        },
        {
          label: 'Height/Width (in px)',
          type: FunctionInputType.NUMBER,
          value: '100',
        },
      ],
    },
    {
      title: 'Weather Forecast',
      subtitle: 'It is okay at figuring out the weather',
      tags: 'weather, temperature, wind',
      author: 'UtilityBelt',
      inputs: [
        {
          type: FunctionInputType.TEXTFIELD,
          label: 'City (Optional)',
          value: '',
        },
        {
          type: FunctionInputType.SELECT_OPTION,
          label: 'Units',
          value: 'IMPERIAL',
          options: 'METRIC,IMPERIAL',
        },
      ],
      function:
        'let city = paramArray[0];\n if(!city) {\n let cityResponse = await fetch("https://ip-fast.com/api/ip/?format=json&location=True");\nlet cityJson = await cityResponse.json();\ncity = cityJson.city;\n}\nlog("City: " + city);\nlet weatherResponse = await fetch("https://goweather.herokuapp.com/weather/" + city);\nlet weatherJson = await weatherResponse.json();\nlet degreeSymbol = "°";\nconst isMetric = paramArray[1] === "METRIC";\nlet tempConverter = (celsiusString) => isMetric ? celsiusString : Math.floor((parseFloat(celsiusString.split(" ")[0]) * 1.8)+32) + " " + degreeSymbol + "F";\nlet speedConverter = (kmString) => isMetric ? kmString : Math.floor(parseFloat(kmString.split(" ")[0]) / 1.609) + " mph";\nprint(`Temperature: ${tempConverter(weatherJson.temperature)}`);\nprint(`\\n`);\nprint(`Wind: ${speedConverter(weatherJson.wind)}`);\nprint(`\n---Extended Forecast---\n${weatherJson.forecast.map(d => `Day ${d.day}: ${tempConverter(d.temperature)} ${speedConverter(d.wind)}`).join("\\n")}`);',
    },
    {
      title: 'Your IP Address',
      subtitle: 'Find your public IP address',
      tags: 'ip, address, ip address',
      author: 'UtilityBelt',
      function: `let prom = await fetch('https://api.ipify.org/?format=json');
      let json = await prom.json();
      print(json.ip);`,
      inputs: [],
    },
    {
      title: 'Postal Carrier',
      subtitle: 'Test your API',
      tags: 'api, test, rest, post, patch, put, delete, options, get',
      author: 'UtilityBelt',
      function:
        'let url = paramArray[0];\nlet method = paramArray[1];\nlet body = paramArray[2];\nlet authorization = paramArray[3];\nlet contentType = paramArray[4];\nlet accept = paramArray[5];\nlet headers = {\n};\nif(contentType) {\n  headers[\'Content-Type\'] = contentType;\n}\nif(authorization) {\n  headers.Authorization = authorization;\n}\nif(accept) {\n  headers.Accept = accept;\n}\nlet options = {\n  method,\n  headers\n}\nif(body) {\n  options.body = body;\n}\nfetch(url, options).then(response => { \n  log(response.status + ": " + response.statusText);\n  return response.json();\n})\n.then(json => print(JSON.stringify(json, null, 2)), e => log("Oh no! " + e));',
      inputs: [
        {
          label: 'URL',
          type: FunctionInputType.TEXTFIELD,
          value: 'https://',
        },
        {
          label: 'Method',
          type: FunctionInputType.SELECT_OPTION,
          options: 'GET, PATCH, PUT, POST, DELETE, OPTIONS',
          value: 'POST',
        },
        {
          label: 'Body',
          type: FunctionInputType.TEXTAREA,
          value: '',
        },
        {
          label: 'Authorization',
          type: FunctionInputType.TEXTFIELD,
          value: '',
        },
        {
          label: 'Content-Type',
          type: FunctionInputType.TEXTFIELD,
          value: 'application/json',
        },
        {
          label: 'accept',
          type: FunctionInputType.TEXTFIELD,
          value: 'application/json',
        },
      ],
    },
  ];
}
