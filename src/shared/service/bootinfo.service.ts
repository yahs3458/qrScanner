import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BootinfoService {
  private readonly BOOT_INFO_KEY = 'bootInfo';
  private readonly CLG_DATA = 'clgInfo';
  private readonly INSTITUTE_INSPECTION_ID = 'instituteInspectionID';
  boot: any = {};
  constructor() {
    this.boot = JSON.parse(localStorage['bootInfo']);
  }

  setBootInfo(bootInfo: any): void {
    localStorage.setItem(this.BOOT_INFO_KEY, JSON.stringify(bootInfo));
  }
  getBootInfoFromLocalStorage(): any {
    return this.boot;
  }
  clearBootInfo(): void {
    localStorage.removeItem(this.BOOT_INFO_KEY);
  }
  getInstituteId() {
    const instituteIdString = localStorage.getItem(this.CLG_DATA);
    return instituteIdString ? JSON.parse(instituteIdString) : null;
  }
  getInstituteInspectionId() {
    const idString = localStorage.getItem(this.INSTITUTE_INSPECTION_ID);
    return idString ? JSON.parse(idString) : null;
  }
  get user_roles(): any {
    return this.boot.user.roles;
  }
}
