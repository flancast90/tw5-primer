/*\
title: $:/plugins/flancast90/tw5-primer/modules/startup/tw5-primer.js
type: application/javascript
module-type: startup

Styling overrides and additions for tw5-primer theme

\*/
(function() {

        /*jslint node: true, browser: true */
        /*global $tw: false */
        
        exports.name = "tw5-primer";
        exports.after = ["rootwidget"];

        exports.startup = function() {
                    // append primer.css stylesheet to tw instance
                    var lnk = document.createElement('link');
                    lnk.href = 'https://unpkg.com/@primer/css@^16.0.0/dist/primer.css';
                    lnk.rel = 'stylesheet';
                    lnk.type = 'text/css';
                    (document.head || document.documentElement).appendChild(lnk);

                    // change a few default styles. We cannot simply append to end of
                    // head because then other stylesheets override it.
                    var oldStyling = document.head.innerHTML;

                    document.head.innerHTML = `
<style>

/*
 Override default body background color
*/

.tc-body {
    background-color: var(--color-bg-canvas) !important;
}

.tc-menubar-list {
    background: var(--color-header-bg) !important;
}

.tc-btn-invisible:hover {
    background-color: !important;
    color: !important;
}

/* change tiddler background, and remove unecessary borders */
.tc-tiddler-frame {
    background-color: var(--color-bg-overlay) !important;
    border: none !important;
}

/* make sidebar more visible by darkening */
.tc-sidebar-scrollable {
    background-color: var(--color-bg-backdrop) !important;
}

.tc-drop-down {
    background-color:var(--color-bg-secondary) !important;
}

.Label--info {
    color: var(--color-label-info-text) !important;
    font-weight: bold !important;
}

blockquote {
    border-left: 5px solid #bbb !important;
    margin-left: 25px !important;
    padding-left: 10px !important;
}

nav.tc-menubar li.tc-menubar-item > a:hover, nav.tc-menubar li.tc-menubar-item > button:hover svg, nav.tc-menubar li.tc-menubar-item > button:hover {
    background-color: #333333 !important;
}

nav.tc-menubar li.tc-menubar-item > a.tc-selected, nav.tc-menubar li.tc-menubar-item > button.tc-selected {
    background-color: #333333 !important;
}

.tc-link-info-item {
    background-color: var(--color-bg-overlay) !important;
}

p {
    color: var(--color-text-primary) !important;
}

/* change default link styling */
.tc-sidebar-lists a.tc-tiddlylink,  .tc-sidebar-lists a.tc-tiddlylink:hover {
      color: var(--color-label-info-text) !important;
}

h1 {
    text-decoration: none !important;
    color: var(--color-scale-blue-4) !important;
}

li {
    color: var(--color-text-secondary) !important;
}

.tc-title {
    color: var(--color-scale-purple-4) !important;
}
</style>
` + oldStyling;

                    // set primer theme to user preference saved in localStorage.
                    // we will default to light theme.

                    // site-wide listener to undo tw changes such as tab class to blank
                    setInterval(function() {
                        pushChanges()
                    }, 1000);

                    // we don't want to keep appending needless classNames to elements each
                    // interval, so we check if they've been undone first.
                    function alreadyThere(item, action) {
                        if (item.tagName.includes("BLOCKQUOTE")) {
                            item.className = " " + action
                        } else {
                            if (item.className.includes(action)) {
                                // do nothing
                            } else {
                                item.className += " " + action
                            }
                        }
                    }

                    function pushChanges() {
                        /*\~~~~~~~ Start Main Theme styling/revisions ~~~~~~~\*/

                        document.getElementsByTagName('html')[0].setAttribute('data-color-mode', 'dark');

                        // default dark mode is dark, not dark_dimmed.
                        document.getElementsByTagName('html')[0].setAttribute('data-dark-theme', 'dark');

                        // all buttons to class=btn
                        var btns = document.getElementsByTagName('button');
                        for (var i = 0; i < btns.length; i++) {
                            alreadyThere(btns[i], "btn ");
                        }

                        // all blockquotes to class=.markdown-body blockquote
                        var blockquotes = document.getElementsByTagName('blockquote');
                        for (var i = 0; i < blockquotes.length; i++) {
                            alreadyThere(blockquotes[i], "markdown-body blockquote ");
                        }

                        // all tags to class=Label
                        var tags = document.getElementsByClassName('tc-tag-label');
                        for (var i = 0; i < tags.length; i++) {
                            alreadyThere(tags[i], "Label mr-1 Label--info ");
                        }

                        /*\~~~~~~~ End Main Theme changes/revisions ~~~~~~~~~\*/


                        /*\~~~~~~~ Start Header styling ~~~~\*/

                        // change header to default primer header class
                        var header = document.getElementsByClassName('tc-menubar-wide');
                        var headerItems = document.getElementsByClassName('tc-menubar-list');

                        if ((header[0] !== undefined)&&(headerItems[0] !== undefined)) {
                            alert(header[0]+" , "+headerItems[0]);                            
                            alreadyThere(header[0], "Header ");

                            for (var i = 0; i < headerItems.length; i++) {
                                alreadyThere(headerItems[i], "Header ");
                            }

                            // fix faulty padding from primer by defining element padding to undo .Header default
                            // because primer-padding obscures certain Tw-Elements
                            header[0].style.padding = 0;
                            headerItems[0].style.padding = 0;
                        }

                        // change all inputs to class="form-control" for external styling
                        var inputs = document.getElementsByTagName('input');
                        for (var i = 0; i < inputs.length; i++) {
                            alreadyThere(inputs[i], "form-control ");
                        }

                        /*~~~~~~~~~ End header styling ~~~~~~~~~*/


                        /*\~~~~~~~~~ start sidebar overrides ~~~~~~~~~~\*/

                        // make parent nav attribute suitable for primer tabnav
                        var sidebarNavs = document.getElementsByClassName('tc-tab-buttons tc-sidebar-tabs-main')[0].getElementsByTagName('button');

                        for (var i = 0; i < sidebarNavs.length; i++) {
                            alreadyThere(sidebarNavs[i], "tabnav-tab ");
                        }
                        document.getElementsByClassName('tc-tab-buttons tc-sidebar-tabs-main')[0].className += " tabnav";

                        /*\~~~~~~~~~ End sidebar overrides ~~~~~~~~~\*/


                        /*\~~~~~~~~~ Start Tiddler-specific styling ~~~~~~~\*/

                        // change all tc-tab-set elements to tabnavs for primer
                        var tabs = document.getElementsByClassName('tc-tab-set')[0].getElementsByTagName('button');
                        document.getElementsByClassName('tc-tab-set')[0].className += " tabnav";

                        for (var i = 0; i < tabs.length; i++) {
                            alreadyThere(tabs[i], "tabnav-tab ");
                        }

                    }

            };

        })();
