import JSZip from 'jszip'

const zip = new JSZip()

class ZipUtils {
  static async init(url: string) {
    const res = await fetch(url).then((res) => res.blob())

    return await zip.loadAsync(res)
  }
}

export { ZipUtils }
