import { DeviceService } from './../../services/device.service';
import { AfterContentInit, Component, OnInit } from '@angular/core';
const d = document,
  n = navigator,
  userAgent = n.userAgent;
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit, AfterContentInit {
  $video: HTMLVideoElement;
  $video2: HTMLVideoElement;
  $link: HTMLLinkElement;
  mediaChunks = null;
  cameraStream = null;
  mediaRecorder: MediaRecorder;
  constraints = {};
  constructor(private device: DeviceService) {
    this.constraints = { audio: true, video: { facingMode: 'user' } };
  }

  ngAfterContentInit(): void {
    this.$video = d.querySelector('#webcam');
    this.$video2 = d.querySelector('#webcam-output');
    this.$link = d.querySelector('#video-downloaded');
  }

  ngOnInit(): void {}

  grabarVideo() {
    this.device.startCapture(this.$video);
    this.generarVideo();
  }

  generarVideo() {
    this.device.generateRecordingPreview(this.$video2, this.$link);
  }

  detenerVideo() {
    this.device.stopCapture();
  }

  /*generateRecordingPreview() {
    let mediaBlob = new Blob(this.mediaChunks, { type: 'video/webm' });
    let mediaBlobUrl = URL.createObjectURL(mediaBlob);

    this.$video2.src = mediaBlobUrl;

    let $link = d.querySelector('#video-downloaded');
    $link.setAttribute('href', mediaBlobUrl);
    $link.setAttribute('download', 'grabacion.webm');
  }

  startCapture() {
    n.mediaDevices
      .getUserMedia(this.constraints)
      .then((mediaStream) => {
        if ('srcObject' in this.$video) {
          this.$video.srcObject = mediaStream;
        } else {
          throw new Error('No es posbile obtener la información');
        }

        this.cameraStream = mediaStream;

        this.$video.play();
        this.mediaRecorder = new MediaRecorder(mediaStream);

        //Arreglo de datos
        this.mediaChunks = [];
        this.mediaRecorder.addEventListener('dataavailable', (evento) => {
          this.mediaChunks.push(evento.data);
          if (this.mediaRecorder.state == 'inactive') {
            this.generateRecordingPreview();
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
  }*/
}
