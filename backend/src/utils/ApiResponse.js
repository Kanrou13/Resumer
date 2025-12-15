class ApiResponse {
  constructor(status, messsage = "Success", data = null) {
    this.statusCode = statusCode;
    this.messsage = messsage;
    this.data = data;
    this.success = true;
  }
}
export default ApiResponse;
