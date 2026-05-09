(function() {
  'use strict';
  const log = console.log
  const $tagSelect = document.getElementById('tagSelect')
  if ($tagSelect) {
    $tagSelect.addEventListener('change', function() {
      const tag = $tagSelect.value
      if (tag) {
        filterStreamsByTag(tag)
      } else {
        clearTagSelection()
      }
      $tagSelect.blur()
    })
  }
  function filterStreamsByTag(tag) {
    document.querySelectorAll('.stream').forEach($stream => {
      const streamTagSet = new Set($stream.getAttribute('data-tags').split(' '))
      if (streamTagSet.has(tag)) {
        $stream.style.display = 'block'
        $stream.querySelectorAll('.chapter').forEach($chapter => {
          const tagsStr = $chapter.getAttribute('data-tags') || ''
          const chapterTagSet = new Set(tagsStr.split(' '))
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
    document.querySelectorAll('.stream').forEach($stream => {
      $stream.style.display = 'block'
    })
    document.querySelectorAll('.chapter').forEach($stream => {
      $stream.style.display = 'block'
    })
  }

  function startSpinning(element) {
    element.style.animation = 'spin360 1s linear infinite';
  }

  const refreshDataBadge = document.querySelector('.refreshDataBadge')
  if (refreshDataBadge) refreshDataBadge.addEventListener('click', e => {startSpinning(e.target)})
  const $hasNewDataBadge = document.querySelector('.hasNewDataBadge')
  if ($hasNewDataBadge) {
    $hasNewDataBadge.addEventListener('click', e => {startSpinning(e.target)})
  }

/*
  if (is_dev) {
    document.querySelectorAll('li[data-dl-cmd]:not([data-dl-cmd=""])').forEach($li => {
      $li.addEventListener('click', function(ev) {
        if (ev.metaKey) {
          const cmd = $li.getAttribute('data-dl-cmd')
          navigator.clipboard.writeText(cmd)
          //console.log(`Copied to clipboard: ${cmd}`)
          toast(`Copied: ${cmd.substring(0, 40)}...`, 'green')
          ev.preventDefault()
        }
      })
    })
  }
*/
}())
