function change() {
  var boxCheckbox = document.querySelectorAll(
    ".filter__checkbox input[type='checkbox']"
  )

  var filters = {
    filterCheckbox: getClassOfCheckedCheckboxes(boxCheckbox)
  }

  filterResults(filters)
}

function getClassOfCheckedCheckboxes(checkboxes) {
  var classes = []

  if (checkboxes && checkboxes.length > 0) {
    for (var i = 0; i < checkboxes.length; i++) {
      var cb = checkboxes[i]

      if (cb.checked) {
        classes.push(cb.getAttribute('rel'))
      }
    }
  }

  return classes
}

function filterResults(filters) {
  let loadMoreBtn = document.querySelector('#load-more')
  let hiddenMoreBtn = document.querySelector('#hidden-more')
  let errorText = document.querySelector('.project__error-box')
  var projects = document.querySelectorAll('.items__box')
  var hiddenProjects = []

  if (!projects || projects.length <= 0) {
    return
  }

  if (filters.filterCheckbox.length <= 0) {
    hiddenMoreBtn.style.display = 'inline-block'
    errorText.style.display = 'none'
  }

  for (var i = 0; i < projects.length; i++) {
    var el = projects[i]

    if (filters.filterCheckbox.length > 0) {
      var isHidden = true

      for (var j = 0; j < filters.filterCheckbox.length; j++) {
        var filter = filters.filterCheckbox[j]

        if (el.classList.contains(filter)) {
          isHidden = false
          break
        }
      }

      if (isHidden) {
        hiddenProjects.push(el)
      }
    }
  }

  for (var i = 0; i < projects.length; i++) {
    projects[i].style.display = 'flex'
  }

  if (hiddenProjects.length <= 0) {
    return
  }

  for (var i = 0; i < hiddenProjects.length; i++) {
    hiddenProjects[i].style.display = 'none'
  }

  loadMoreBtn.style.display = 'none'
  hiddenMoreBtn.style.display = 'none'

  if (projects.length === hiddenProjects.length) {
    errorText.style.display = 'flex'
  }

  if (projects.length - hiddenProjects.length > 0) {
    errorText.style.display = 'none'
  }
}
