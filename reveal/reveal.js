document.onmousemove = handleMouseMove;
function handleMouseMove(event) {
    var eventDoc, doc, body;

    event = event || window.event; // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
            (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }

    for (element of document.getElementsByClassName("reveal")) {
        let rect = element.getBoundingClientRect();
        if ((rect.left < event.pageX) && (event.pageX < rect.right) && (rect.top < event.pageY) && (event.pageY < rect.bottom)) {
            let x = event.pageX - rect.left;
            let y = event.pageY - rect.top;
            element.style.borderImage = `radial-gradient(
                circle 100px at ${x}px ${y}px,
                rgba(200, 200, 200, 1), rgba(200, 200, 200, 0.2)
            ) 1`;
            element.style.background = `radial-gradient(
                circle at ${x}px ${y}px,
                rgba(200, 200, 200, 0.1), rgba(200, 200, 200, 0)
            )`;
        }
        else {
            let x = event.pageX - rect.left;
            let y = event.pageY - rect.top;
            element.style.borderImage = `radial-gradient(
                circle 100px at ${x}px ${y}px,
                #ccc, rgba(200, 200, 200, 0.01) 60%
            ) 1`;
            element.style.background = "transparent";
        }
    }
}