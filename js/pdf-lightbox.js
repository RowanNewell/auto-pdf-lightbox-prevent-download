jQuery(document).ready(function($) {
    var pdfDoc = null,
        canvasContainer = document.getElementById('pdf-pages');

    // Function to render a specific page
    function renderPage(page, scale) {
        var viewport = page.getViewport({ scale: scale });
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        canvasContainer.appendChild(canvas);

        return page.render(renderContext).promise;
    }

    // Function to render all pages sequentially
    function renderAllPages(pdfDoc) {
        var scale = 1.5;
        var renderPageChain = Promise.resolve(); // Initial empty resolved promise

        for (var pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
            renderPageChain = renderPageChain.then(function(pageNum) {
                return pdfDoc.getPage(pageNum).then(function(page) {
                    return renderPage(page, scale);
                });
            }.bind(null, pageNum)); // Bind the current pageNum to the closure
        }
    }

    // Open PDF links in the lightbox
    $('a[href$=".pdf"]').on('click', function(event) {
        event.preventDefault();
        var pdfUrl = $(this).attr('href');

        // Show the lightbox
        $('#pdf-lightbox').fadeIn();

        // Clear any previously rendered pages
        canvasContainer.innerHTML = '';

        // Load the PDF
        pdfjsLib.getDocument(pdfUrl).promise.then(function(pdfDoc_) {
            pdfDoc = pdfDoc_;
            renderAllPages(pdfDoc);
        });
    });

    // Disable right-click on the entire lightbox container
    $('#pdf-container').on('contextmenu', function(event) {
        event.preventDefault();
    });

    // Close the lightbox when clicking the close button
    $('#pdf-close-btn').on('click', function() {
        $('#pdf-lightbox').fadeOut();
    });

    // Close the lightbox when clicking outside the PDF container
    $('#pdf-lightbox').on('click', function(event) {
        if ($(event.target).closest('#pdf-container').length === 0) {
            $('#pdf-lightbox').fadeOut();
        }
    });
});