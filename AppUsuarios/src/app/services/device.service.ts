import { Observable } from 'rxjs';
import { isBrowser, isDesktop } from './../helper/getInfoDevice';
import { isMobile } from './../helper/getInfoDevice';
import {
  AfterViewInit,
  ElementRef,
  Injectable,
  ViewChild,
} from '@angular/core';

const d = document,
  n = navigator,
  userAgent = n.userAgent;

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  $link: HTMLLinkElement;
  mediaChunks = null;
  cameraStream = null;
  mediaRecorder: MediaRecorder;
  constraints = {};
  device = {};
  constructor() {
    this.constraints = { audio: true, video: { facingMode: 'user' } };
  }

  generateRecordingPreview(video: HTMLVideoElement, link: HTMLLinkElement) {
    let mediaBlob = new Blob(this.mediaChunks, { type: 'video/webm' });
    let mediaBlobUrl = URL.createObjectURL(mediaBlob);

    video.src = mediaBlobUrl;

    link.setAttribute('href', mediaBlobUrl);
    link.setAttribute('download', 'grabacion.webm');
  }

  startCapture(video: HTMLVideoElement) {
    n.mediaDevices
      .getUserMedia(this.constraints)
      .then((mediaStream) => {
        if ('srcObject' in video) {
          video.srcObject = mediaStream;
        } else {
          throw new Error('No es posbile obtener la información');
        }

        this.cameraStream = mediaStream;

        video.play();
        this.mediaRecorder = new MediaRecorder(mediaStream);

        //Arreglo de datos
        this.mediaChunks = [];
        this.mediaRecorder.addEventListener('dataavailable', (evento) => {
          this.mediaChunks.push(evento.data);
          if (this.mediaRecorder.state == 'inactive') {
            this.generateRecordingPreview(video, this.$link);
          }
        });

        this.mediaRecorder.start();
      })
      .catch((err) => {
        console.log(err.name + ': ' + err.message);
      });
  }

  stopCapture() {
    if (this.cameraStream != null) {
      this.cameraStream.getTracks().forEach(function (track) {
        track.stop();
      });
    }

    if (this.mediaRecorder != null) {
      if (this.mediaRecorder.state == 'recording') {
        this.mediaRecorder.stop();
      }
    }
  }
}
