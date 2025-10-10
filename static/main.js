(function() {
  'use strict';
  const log = console.log
  const $tagSelect = document.getElementById('tagSelect')
  $tagSelect.addEventListener('change', function() {
    const tag = $tagSelect.value
    if (tag) {
      filterStreamsByTag(tag)
    } else {
      clearTagSelection()
    }
    $tagSelect.blur()
  })
  function filterStreamsByTag(tag) {
    var $streams = document.querySelectorAll('.stream').forEach($stream => {
      const streamTagSet = new Set($stream.getAttribute('data-tags').split(' '))
      if (streamTagSet.has(tag)) {
        $stream.style.display = 'block'
        $stream.querySelectorAll('.chapter').forEach($chapter => {
          const chapterTagSet = new Set($chapter.getAttribute('data-tags').split(' '))
          if (chapterTagSet.has(tag)) {
            $chapter.style.display = 'block'
          } else {
            $chapter.style.display = 'none'
          }
        })
      } else {
        $stream.style.display = 'none'
      }
    })
  }
  function clearTagSelection() {
    var $streams = document.querySelectorAll('.stream').forEach($stream => {
      $stream.style.display = 'block'
    })
    var $streams = document.querySelectorAll('.chapter').forEach($stream => {
      $stream.style.display = 'block'
    })
  }

  function startSpinning(element) {
    element.style.animation = 'spin360 1s linear infinite';
  }

  document.querySelector('.refreshDataBadge').addEventListener('click', e => {startSpinning(e.target)})
  const $hasNewDataBadge = document.querySelector('.hasNewDataBadge')
  if ($hasNewDataBadge) {
    $hasNewDataBadge.addEventListener('click', e => {startSpinning(e.target)})
  }
}())
