onmessage = function (e) {
  const result = e
  postMessage(workerResult)
}
