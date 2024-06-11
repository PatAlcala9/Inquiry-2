export function isNumberKey (evt) {
  const charCode = (evt.which) ? evt.which : event.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false
  }
  return true
}

export function fullName (firstname, middlename, lastname, occfirstname, occmiddlename, occlastname) {
  let result
  let fname
  let mname
  let lname

  if (occfirstname === null) {
    if (firstname === '') {
      fname = ''
    } else {
      fname = firstname + ' '
    }
  } else {
    fname = occfirstname + ' '
  }
  if (occmiddlename === null) {
    if (middlename === '') {
      mname = ''
    } else {
      mname = middlename + '. '
    }
  } else {
    mname = occmiddlename + '. '
  }
  if (occlastname === null) {
    if (lastname === '') {
      mname = ''
    } else {
      lname = lastname
    }
  } else {
    lname = occlastname
  }

  this.result = fname + mname + lname
  return result
}

export function fullAddress (block, lot, address, occblock, occlot, occaddress) {
  let result
  let blk
  let lt
  let addrss

  if (occblock === 0) {
    if (block === 0) {
      blk = ''
    } else {
      blk = 'Block ' + block + ' '
    }
  } else {
    blk = 'Block ' + occblock + ' '
  }

  if (occlot === 0) {
    if (lot === 0) {
      lt = ''
    } else {
      lt = 'Lot ' + lot + ' '
    }
  } else {
    lt = 'Lot ' + occlot + ' '
  }

  if (occaddress === 0) {
    if (address === 0) {
      addrss = ''
    } else {
      addrss = address
    }
  } else {
    addrss = occaddress
  }

  this.result = blk + lt + addrss
  return result
}

export function isNotEmpty (object) {
  let result
  const elength = (object === null || object === undefined) ? 0 : object.length

  if (elength === 0) {
    result = false
  } else {
    result = true
  }

  return result
}
