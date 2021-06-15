import * as FileSystem from 'expo-file-system';

export default class Env  {
  public folders:any;
  constructor(props) {
    this.folders = {
      Camera : FileSystem.cacheDirectory+'Camera/',
      Photos : FileSystem.documentDirectory+'Photos/',
      PhotoM : FileSystem.documentDirectory+'Photos/M/',
      PhotoF : FileSystem.documentDirectory+'Photos/F/'
    }
  }
  public init = async () => {
    const Camera = FileSystem.makeDirectoryAsync(this.folders.Camera, {intermediates: true});
    const PhotoF = FileSystem.makeDirectoryAsync(this.folders.PhotoF, {intermediates: true});
    const PhotoM = FileSystem.makeDirectoryAsync(this.folders.PhotoM, {intermediates: true});
    Promise.all([Camera, PhotoF, PhotoM]).then((result)=> {
      console.log('Promis result', result);
    }).catch ((err) => {
      console.log('Promise.all', err);
    });
    }
};