// -- Module dependencies --

import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-electron';

  versions = { node: '', chrome: '', electron: '' };

  constructor(private _electronService: ElectronService) {
    // Make sure that app is being executed inside of electron.
    if (this._electronService.isElectronApp) {
      // We have access to node process.
      this.versions.node = this._electronService.process.versions.node;
      this.versions.chrome = this._electronService.process.versions.chrome;
      this.versions.electron = this._electronService.process.versions.electron;
    }
  }
}
