import { Component, ViewChild } from '@angular/core';
import { ElectronService } from './services/electron.service';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('editor')
  public editor: QuillEditorComponent;
  public filePath: string;
  public fileContent: string;

  constructor(private electronService: ElectronService) { }

  public onNewFile() {
    this.filePath = '';
    this.fileContent = '';
  }

  public async onOpenFile() {
    if (this.electronService.isElectron) {
      const res = await this.electronService.remote.dialog.showOpenDialog({
        properties: ['openFile']
      });
      if (res.filePaths.length) {
        const data = this.electronService.fs.readFileSync(res.filePaths[0]);
        this.filePath = res.filePaths[0];
        this.fileContent = data.toString();
      }
    }
  }

  public async onSaveFile() {
    if (this.electronService.isElectron) {
      if (!this.filePath) {
        const res = await this.electronService.remote.dialog.showOpenDialog({
          properties: ['promptToCreate']
        });
        if (res.filePaths.length) {
          this.filePath = res.filePaths[0];
        }
      }
      if (!this.filePath.endsWith('.html')) {
        this.filePath += '.html';
      }
      this.electronService.fs.writeFile(this.filePath, this.fileContent, (err) => {
        if (err) {
          // TODO:
          //    handle error.
          return;
        }
      });
    }
  }

  public onMinimizeWindow() {
    if (this.electronService.isElectron) {
      this.electronService.remote.getCurrentWindow().minimize();
    }
  }

  public onMaximizeWindow() {
    if (this.electronService.isElectron) {
      this.electronService.remote.getCurrentWindow().maximize();
    }
  }

  public onCloseWindow() {
    if (this.electronService.isElectron) {
      this.electronService.remote.getCurrentWindow().close();
    }
  }
}
