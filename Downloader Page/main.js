const fileInput = document.querySelector('input');
const downloadBtb = document.querySelector('button');


downloadBtb.addEventListener("click", e => {
    e.preventDefault(); // Prevent form from to submitting
    downloadBtb.innerText = "Downloading file...";
    fetchFile(fileInput.value);
});

function fetchFile(url) {
    //fetching file & returning response as blob
    fetch(url).then(res => res.blob()).then(file => {
        // URL.createObjectURL creates a URL of passed objects
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl; //passing tempUrl as href value of <a> tag
        aTag.download = url.replace(/^.*[\\\/]/, ''); //passing last name and extension as download value of <a> tag
        document.body.appendChild(aTag); // adding <a> tag inside body
        aTag.click(); //clicking <a> tag so the file download
        aTag.remove(); // removing <a> tag once file downloaded
        URL.revokeObjectURL(tempUrl);
        downloadBtb.innerText = "Download file";
       
    }).catch(() => {
        //call method will call if any error comes during downloading
        downloadBtb.innerText = "Download file";
        alert("Failed to download file!");

    });
}