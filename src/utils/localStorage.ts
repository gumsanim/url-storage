/* localStorage를 관리하는 class 입니다. */
class LocalStorage {
  public readonly localStorage = window.localStorage;

  getData(key: string): string | null {
    if (this.hasData(key)) {
      return this.localStorage.getItem(key);
    }
    return null;
  }

  hasData(key: string): boolean {
    return !!this.localStorage.getItem(key);
  }

  setData(key: string, value: string) {
    this.localStorage.setItem(key, value);
  }

  removeData(key: string) {
    if (this.hasData(key)) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }
}

const localStorage = new LocalStorage();
export default localStorage;
