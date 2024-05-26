let localStream;
let remoteStream;
let localVideo = document.getElementById('localVideo');
let remoteVideo = document.getElementById('remoteVideo');
let startButton = document.getElementById('startButton');
let hangupButton = document.getElementById('hangupButton');
let localPeerConnection;
let remotePeerConnection;

startButton.onclick = startVideoCall;
hangupButton.onclick = hangUp;

// Function to start the video call
async function startVideoCall() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStream = stream;
        localVideo.srcObject = stream;

        const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

        // Create local peer connection
        localPeerConnection = new RTCPeerConnection(configuration);
        localPeerConnection.addEventListener('icecandidate', handleLocalICECandidate);

        // Add local stream to peer connection
        localStream.getTracks().forEach(track => localPeerConnection.addTrack(track, localStream));

        // Create remote peer connection
        remotePeerConnection = new RTCPeerConnection(configuration);
        remotePeerConnection.addEventListener('icecandidate', handleRemoteICECandidate);
        remotePeerConnection.addEventListener('track', handleRemoteTrack);

        // Set up media negotiation
        localPeerConnection.createOffer().then(offer => localPeerConnection.setLocalDescription(offer));
        localPeerConnection.onicecandidate = event => {
            if (event.candidate) {
                remotePeerConnection.addIceCandidate(event.candidate);
            }
        };

        // Set remote description when offer is received from local
        localPeerConnection.onicecandidate = async (event) => {
            try {
                await remotePeerConnection.setRemoteDescription(event.candidate);
            } catch (error) {
                console.error('Error setting remote description:', error);
            }
        };

        // Create answer when offer is received from local
        remotePeerConnection.onicecandidate = async (event) => {
            try {
                if (event.candidate) {
                    await localPeerConnection.addIceCandidate(event.candidate);
                }
            } catch (error) {
                console.error('Error adding ICE candidate:', error);
            }
        };

        const offer = await localPeerConnection.createOffer();
        await localPeerConnection.setLocalDescription(offer);
        await remotePeerConnection.setRemoteDescription(offer);

        const answer = await remotePeerConnection.createAnswer();
        await remotePeerConnection.setLocalDescription(answer);
        await localPeerConnection.setRemoteDescription(answer);

    } catch (error) {
        console.error('Error starting video call:', error);
    }
}

// Function to handle ICE candidate from local peer connection
function handleLocalICECandidate(event) {
    if (event.candidate) {
        remotePeerConnection.addIceCandidate(event.candidate);
    }
}

// Function to handle ICE candidate from remote peer connection
function handleRemoteICECandidate(event) {
    if (event.candidate) {
        localPeerConnection.addIceCandidate(event.candidate);
    }
}

// Function to handle remote track
function handleRemoteTrack(event) {
    remoteStream = event.streams[0];
    remoteVideo.srcObject = remoteStream;
}

// Function to hang up the call
function hangUp() {
    localStream.getTracks().forEach(track => track.stop());
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
    localPeerConnection.close();
    remotePeerConnection.close();
}
