
class FlaskGPT {
    #speechRecognition = false;

    constructor() {
      this.URL = '/gpt';
      var speech_api = window.SpeechRecognition || webkitSpeechRecognition;
      if (speech_api) {
        this.speechRecognition = new speech_api();
      }
      
    }

    addUserInput(message, callback) {
      let url = this.URL + `?user_input=${encodeURIComponent(message)}`;          
      fetch(url)
          .then((response) => response.json())
          .then((data) => {
            let content = data.content;
            callback({"result": content});
          }).catch((error) => {
            console.error("Error fetching GPT response:", error);
          });          
    }

    textToSpeech(message) {
      if (window.speechSynthesis) {
        let utterance = new SpeechSynthesisUtterance();
        utterance.voice = window.speechSynthesis.getVoices().filter( (voice)=>voice.name=="Google US English" )[0];

        var lines=message.split('.');
        for (var i=0; i<(lines.length); i++) {
          if (lines[i].length>1) {
            utterance.text = lines[i]+'.';
            window.speechSynthesis.speak(utterance);     
          }
        }

      } else {
        throw new Error('window.speechSynthesis is not supported by this browser');
      }
    }

    speechToText(callback) {
      this.speechRecognition.continuous = true;
      this.speechRecognition.interimResults = true;
      this.speechRecognition.lang = "US-EN";

      this.speechRecognition.onresult = function(event) {
        var currentIndex=event.resultIndex;
        if (event.results[currentIndex].isFinal) {
          var result=event.results[currentIndex][0].transcript;
          event.currentTarget.stop();
          console.log('speechToText::'+ result);
          callback(result);
        }
      }

      this.speechRecognition.start();
    }


  }