<template lang="pug">

div
  section.flex.flex-center
    section.fit.column.wrap.justify-center.items-center.content-center
      input(type="text" v-model="applicationNo" placeholder="Application Number" @keypress.enter="activate" @keyup="formatInput").input
      button(@click="activate").button Generate
    img(src="../assets/lungsod.png" alt="PNG Image" style="display: none" id="lungsod")
    img(src="../assets/ocbologo2.png" alt="PNG Image" style="display: none" id="ocbo")

q-dialog(v-model="alert" transition-show="slide-down" transition-hide="slide-up")
  q-card.alert
    q-card-section
      div.text-center.alert-title Error

    q-card-section.q-pt-none
      span.alert-message {{alertMessage}}

    q-card-actions(align="right")
      q-btn(flat label="OK" color="primary" v-close-popup)
</template>

<script setup>
import { jsPDF } from 'jspdf'
import { date, useQuasar, QSpinnerOrbit } from 'quasar'
import { api } from 'boot/axios'
// import { fullName } from 'src/js/functions'
import { ref } from 'vue'

const quasar = useQuasar()

let applicationNo = ref('')

// export interface Props {
//   text: string
// }
//
// const props = withDefaults(defineProps<Props>(), {
//   text: 'Sample Text',
// })

let alert = ref(false)
let alertMessage = ref('')

let today = ''
let fName = ''
let faddress = ''
const permitType = 'BUILDING'
let flocation = ''
let occupancyType = ''

const checkConnection = async () => {
  try {
    const response = await api.get('/api/CheckConnection')
    const data = response.data.length !== 0 ? response.data : null

    if (data !== null) return data.result === '1'
    else return false
  } catch {
    return false
  }
}

const createPDF2 = async () => {
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'legal',
  })

  const lungsodItem = document.getElementById('lungsod')
  const lungsodSrc = lungsodItem?.getAttribute('src')
  const lungsodLink = document.createElement('a')
  lungsodLink.href = lungsodSrc ?? ''

  const ocboItem = document.getElementById('ocbo')
  const ocboSrc = ocboItem?.getAttribute('src')
  const ocboLink = document.createElement('a')
  ocboLink.href = ocboSrc ?? ''

  function getTextWidth(text: string, fontSize: number) {
    doc.setFontSize(fontSize)
    return doc.getStringUnitWidth(text) * fontSize * 0.35
  }

  const pageWidth = doc.internal.pageSize.getWidth()

  const republicText = 'Republic of the Philippines'
  const republicTextWidth = getTextWidth(republicText, 14)
  const officeText = 'OFFICE OF THE CITY BUILDING OFFICIAL'
  const officeTextWidth = getTextWidth(officeText, 16)
  const cityText = 'City of Davao'
  const cityTextWidth = getTextWidth(cityText, 14)

  const republicTextX = (pageWidth - republicTextWidth) / 2
  const officeTextX = (pageWidth - officeTextWidth) / 2
  const cityTextX = (pageWidth - cityTextWidth) / 2

  doc.setFont('times', 'normal')
  doc.setFontSize(14)
  doc.text(republicText, republicTextX, 10)
  doc.setFont('times', 'bold')
  doc.setFontSize(16)
  doc.text(officeText, officeTextX, 17)
  doc.setFont('times', 'normal')
  doc.setFontSize(14)
  doc.text(cityText, cityTextX, 23)

  doc.addImage(lungsodLink.href, 'PNG', 7, 2, 30, 30, 'lungsod', 'NONE', 0)
  doc.addImage(ocboLink.href, 'PNG', pageWidth - 36, 2, 29, 29, 'ocbo', 'NONE', 0)

  doc.setLineWidth(0.9)
  doc.line(10, 34, pageWidth - 10, 34)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('Application No.: ', 10, 40)
  const appWidth = getTextWidth('Application No.: ', 10)
  doc.setFont('helvetica', 'bold')
  doc.text(applicationNo.value, appWidth + 10, 40)

  doc.setFont('helvetica', 'normal')
  const dateWidth = getTextWidth(today, 10)
  doc.text(today, pageWidth - dateWidth * 1.6, 40)

  doc.setFont('helvetica', 'bold')
  const findingsWidth = getTextWidth('FINDINGS AND RECOMMENDATIONS', 16)
  const findingsWidthX = (pageWidth - findingsWidth) / 2
  doc.text('FINDINGS AND RECOMMENDATIONS', findingsWidthX, 52)

  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text(fName.toUpperCase(), 10, 64)

  doc.setFont('helvetica', 'normal')
  doc.text(faddress.toUpperCase(), 10, 70)

  doc.setFont('helvetica', 'bold')
  const attentionWidth = getTextWidth('ATTENTION', 14)
  const attentionWidthX = (pageWidth - attentionWidth) / 2
  const concernWidth = getTextWidth('CONCERNED DESIGNING ENGINEER/ARCHITECT', 12)
  const concernWidthX = (pageWidth - concernWidth) / 2
  doc.setFontSize(14)
  doc.text('ATTENTION', attentionWidthX, 88)
  doc.setFontSize(12)
  doc.text('CONCERNED DESIGNING ENGINEER/ARCHITECT', concernWidthX, 94)

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text('Sir/Madam:', 10, 106)

  let startY = 112
  let currentX = 10

  doc.setFont('helvetica', 'normal')
  const sentence = '    Please be informed that as per evaluation of your '
  const sentence2 = ' PERMIT application, including attached documents and plans for the proposed '
  const sentence3 = ' structure, located at '
  const sentence4 = ', revealed the following deficiencies pursuant to Section 302 of the National Building Code of the Philippines (PD 1096) with its revised implementing rules and regulations, to wit;'

  doc.setFont('helvetica', 'normal')
  const paragraph = sentence + permitType + sentence2 + occupancyType + sentence3 + flocation.toUpperCase() + sentence4

  doc.text(paragraph, currentX, startY, { maxWidth: 196, align: 'justify' })

  let y = startY + 24
  doc.setFontSize(10)

  for (let i = 0; i < progressFlowDisplayList.length; i++) {
    doc.setFont('helvetica', 'bold')
    doc.text(progressFlowDisplayList[i], 10, y)
    y += 5

    const actionLines = actionDisplayList[i].split('\n')

    for (let j = 0; j < actionLines.length; j++) {
      doc.setFont('helvetica', 'normal')
      doc.text(actionLines[j], 16, y, { maxWidth: 190 })
      if (getTextWidth(actionLines[j], 10) > 186) y += 5
      y += 5
    }

    if (y >= 195) {
      progressFlowDisplayListPage2 = progressFlowDisplayList.slice(i + 1)
      actionDisplayListPage2 = actionDisplayList.slice(i + 1)
      break
    }
  }

  const newY = y + 6
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  const footer1 = '      IN VIEW OF HEREOF, YOU ARE HEREBY DIRECTED TO COMPLY AND RECTIFY THE ABOVE-STATED DEFICIENCIES WITHIN'
  const coloredFooter = 'THIRTY (30) CALENDAR DAYS'
  const footer2 = 'UPON RECEIPT HEREOF. FOR NON-COMPLIANCE, THE CITY SHALL HAVE FILED AGAINST THE'
  const footer3 = 'SAID OWNER FOR VIOLATION OF PD 1096.'
  // const fullText = footer1 + coloredFooter + footer2
  // doc.text(fullText, 10, newY, { maxWidth: 196, align: 'justify' })

  doc.text(footer1, 10, newY, { maxWidth: 196, align: 'justify' })
  doc.setTextColor(255, 0, 0)
  doc.text(coloredFooter, 10, newY + 4)

  doc.setTextColor(0, 0, 0)
  doc.text(footer2, 58, newY + 4, { maxWidth: 196, align: 'justify' })
  doc.text(footer3, 10, newY + 8, { maxWidth: 196, align: 'justify' })

  doc.text('YOUR COOPERATION ON THIS MATTER IS HIGHLY APPRECIATED.', 10, newY + 14)

  let pageNum = ''

  if (progressFlowDisplayListPage2.length > 0) {
    pageNum = 'Page 1'
    const pageNumWidth = getTextWidth(pageNum, 7)
    const pageNumWidthX = (pageWidth - pageNumWidth) / 2
    doc.setFont('helvetica', 'italic')
    doc.text(pageNum, pageNumWidthX, 192 + 72)

    doc.addPage('legal')

    doc.setFont('times', 'normal')
    doc.setFontSize(14)
    doc.text(republicText, republicTextX, 10)
    doc.setFont('times', 'bold')
    doc.setFontSize(16)
    doc.text(officeText, officeTextX, 17)
    doc.setFont('times', 'normal')
    doc.setFontSize(14)
    doc.text(cityText, cityTextX, 23)

    doc.addImage(lungsodLink.href, 'PNG', 7, 2, 30, 30, 'lungsod', 'NONE', 0)
    doc.addImage(ocboLink.href, 'PNG', pageWidth - 36, 2, 29, 29, 'ocbo', 'NONE', 0)

    doc.setLineWidth(0.9)
    doc.line(10, 34, pageWidth - 10, 34)

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Application No.: ', 10, 40)
    const appWidth = getTextWidth('Application No.: ', 10)
    doc.setFont('helvetica', 'bold')
    doc.text(applicationNo.value, appWidth + 10, 40)

    doc.setFont('helvetica', 'normal')
    const dateWidth = getTextWidth(today, 10)
    doc.text(today, pageWidth - dateWidth * 1.6, 40)

    doc.setFont('helvetica', 'bold')
    const findingsWidth = getTextWidth('FINDINGS AND RECOMMENDATIONS', 16)
    const findingsWidthX = (pageWidth - findingsWidth) / 2
    doc.text('FINDINGS AND RECOMMENDATIONS', findingsWidthX, 52)
    // doc.setLineWidth(0.2)
    // doc.line(63, 53, 154, 53)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text(fName.toUpperCase(), 10, 64)

    doc.setFont('helvetica', 'normal')
    doc.text(faddress.toUpperCase(), 10, 70)

    doc.setFont('helvetica', 'bold')
    const attentionWidth = getTextWidth('ATTENTION', 14)
    const attentionWidthX = (pageWidth - attentionWidth) / 2
    const concernWidth = getTextWidth('CONCERNED DESIGNING ENGINEER/ARCHITECT', 12)
    const concernWidthX = (pageWidth - concernWidth) / 2
    doc.setFontSize(14)
    doc.text('ATTENTION', attentionWidthX, 88)
    doc.setFontSize(12)
    doc.text('CONCERNED DESIGNING ENGINEER/ARCHITECT', concernWidthX, 94)
    // doc.setLineWidth(0.2)
    // doc.line(71, 83, 175, 83)

    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.text('Sir/Madam:', 10, 106)

    let startY = 112
    let currentX = 10

    doc.setFont('helvetica', 'normal')
    const sentence = '    Please be informed that as per evaluation of your '
    const sentence2 = ' PERMIT application, including attached documents and plans for the proposed '
    const sentence3 = ' structure, located at '
    const sentence4 = ', revealed the following deficiencies pursuant to Section 302 of the National Building Code of the Philippines (PD 1096) with its revised implementing rules and regulations, to wit;'

    doc.setFont('helvetica', 'normal')
    const paragraph = sentence + permitType + sentence2 + occupancyType + sentence3 + flocation.toUpperCase() + sentence4

    doc.text(paragraph, currentX, startY, { maxWidth: 196, align: 'justify' })

    let y = startY + 24
    doc.setFontSize(10)

    for (let i = 0; i < progressFlowDisplayListPage2.length; i++) {
      doc.setFont('helvetica', 'bold')
      doc.text(progressFlowDisplayListPage2[i], 10, y)
      y += 5

      const actionLines = actionDisplayListPage2[i].split('\n')

      for (let j = 0; j < actionLines.length; j++) {
        doc.setFont('helvetica', 'normal')
        doc.text(actionLines[j], 16, y, { maxWidth: 190 })
        if (getTextWidth(actionLines[j], 10) > 186) y += 5
        y += 5
      }

      if (y >= 195) {
        progressFlowDisplayListPage3 = progressFlowDisplayListPage2.slice(i + 1)
        actionDisplayListPage3 = actionDisplayListPage2.slice(i + 1)
        break
      }
    }

    const newY = y + 6
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    const footer1 = '      IN VIEW OF HEREOF, YOU ARE HEREBY DIRECTED TO COMPLY AND RECTIFY THE ABOVE-STATED DEFICIENCIES WITHIN'
    const coloredFooter = 'THIRTY (30) CALENDAR DAYS'
    const footer2 = 'UPON RECEIPT HEREOF. FOR NON-COMPLIANCE, THE CITY SHALL HAVE FILED AGAINST THE'
    const footer3 = 'SAID OWNER FOR VIOLATION OF PD 1096.'

    doc.text(footer1, 10, newY, { maxWidth: 196, align: 'justify' })
    doc.setTextColor(255, 0, 0)
    doc.text(coloredFooter, 10, newY + 4)

    doc.setTextColor(0, 0, 0)
    doc.text(footer2, 58, newY + 4, { maxWidth: 196, align: 'justify' })
    doc.text(footer3, 10, newY + 8, { maxWidth: 196, align: 'justify' })

    doc.text('YOUR COOPERATION ON THIS MATTER IS HIGHLY APPRECIATED.', 10, newY + 14)

    if (progressFlowDisplayListPage3.length > 0) {
      pageNum = 'Page 2'
      const pageNumWidth = getTextWidth(pageNum, 7)
      const pageNumWidthX = (pageWidth - pageNumWidth) / 2
      doc.setFont('helvetica', 'italic')
      doc.text(pageNum, pageNumWidthX, 192 + 72)

      doc.addPage('legal')

      doc.setFont('times', 'normal')
      doc.setFontSize(14)
      doc.text(republicText, republicTextX, 10)
      doc.setFont('times', 'bold')
      doc.setFontSize(16)
      doc.text(officeText, officeTextX, 17)
      doc.setFont('times', 'normal')
      doc.setFontSize(14)
      doc.text(cityText, cityTextX, 23)

      doc.addImage(lungsodLink.href, 'PNG', 7, 2, 30, 30, 'lungsod', 'NONE', 0)
      doc.addImage(ocboLink.href, 'PNG', pageWidth - 36, 2, 29, 29, 'ocbo', 'NONE', 0)

      doc.setLineWidth(0.9)
      doc.line(10, 34, pageWidth - 10, 34)

      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.text('Application No.: ', 10, 40)
      const appWidth = getTextWidth('Application No.: ', 10)
      doc.setFont('helvetica', 'bold')
      doc.text(applicationNo.value, appWidth + 10, 40)

      doc.setFont('helvetica', 'normal')
      const dateWidth = getTextWidth(today, 10)
      doc.text(today, pageWidth - dateWidth * 1.6, 40)

      doc.setFont('helvetica', 'bold')
      const findingsWidth = getTextWidth('FINDINGS AND RECOMMENDATIONS', 16)
      const findingsWidthX = (pageWidth - findingsWidth) / 2
      doc.text('FINDINGS AND RECOMMENDATIONS', findingsWidthX, 52)
      // doc.setLineWidth(0.2)
      // doc.line(63, 53, 154, 53)

      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text(fName.toUpperCase(), 10, 64)

      doc.setFont('helvetica', 'normal')
      doc.text(faddress.toUpperCase(), 10, 70)

      doc.setFont('helvetica', 'bold')
      const attentionWidth = getTextWidth('ATTENTION', 14)
      const attentionWidthX = (pageWidth - attentionWidth) / 2
      const concernWidth = getTextWidth('CONCERNED DESIGNING ENGINEER/ARCHITECT', 12)
      const concernWidthX = (pageWidth - concernWidth) / 2
      doc.setFontSize(14)
      doc.text('ATTENTION', attentionWidthX, 88)
      doc.setFontSize(12)
      doc.text('CONCERNED DESIGNING ENGINEER/ARCHITECT', concernWidthX, 94)
      // doc.setLineWidth(0.2)
      // doc.line(71, 83, 175, 83)

      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      doc.text('Sir/Madam:', 10, 106)

      let startY = 112
      let currentX = 10

      doc.setFont('helvetica', 'normal')
      const sentence = '    Please be informed that as per evaluation of your '
      const sentence2 = ' PERMIT application, including attached documents and plans for the proposed '
      const sentence3 = ' structure, located at '
      const sentence4 = ', revealed the following deficiencies pursuant to Section 302 of the National Building Code of the Philippines (PD 1096) with its revised implementing rules and regulations, to wit;'

      doc.setFont('helvetica', 'normal')
      const paragraph = sentence + permitType + sentence2 + occupancyType + sentence3 + flocation.toUpperCase() + sentence4

      doc.text(paragraph, currentX, startY, { maxWidth: 196, align: 'justify' })

      let y = startY + 24
      doc.setFontSize(10)

      for (let i = 0; i < progressFlowDisplayListPage3.length; i++) {
        doc.setFont('helvetica', 'bold')
        doc.text(progressFlowDisplayListPage3[i], 10, y)
        y += 5

        const actionLines = actionDisplayListPage3[i].split('\n')

        for (let j = 0; j < actionLines.length; j++) {
          doc.setFont('helvetica', 'normal')
          doc.text(actionLines[j], 16, y, { maxWidth: 190 })
          if (getTextWidth(actionLines[j], 10) > 186) y += 5
          y += 5
        }

        if (y >= 195) {
          progressFlowDisplayListPage4 = progressFlowDisplayListPage3.slice(i + 1)
          actionDisplayListPage4 = actionDisplayListPage3.slice(i + 1)
          break
        }
      }

      const newY = y + 6
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      const footer1 = '      IN VIEW OF HEREOF, YOU ARE HEREBY DIRECTED TO COMPLY AND RECTIFY THE ABOVE-STATED DEFICIENCIES WITHIN'
      const coloredFooter = 'THIRTY (30) CALENDAR DAYS'
      const footer2 = 'UPON RECEIPT HEREOF. FOR NON-COMPLIANCE, THE CITY SHALL HAVE FILED AGAINST THE'
      const footer3 = 'SAID OWNER FOR VIOLATION OF PD 1096.'

      doc.text(footer1, 10, newY, { maxWidth: 196, align: 'justify' })
      doc.setTextColor(255, 0, 0)
      doc.text(coloredFooter, 10, newY + 4)

      doc.setTextColor(0, 0, 0)
      doc.text(footer2, 58, newY + 4, { maxWidth: 196, align: 'justify' })
      doc.text(footer3, 10, newY + 8, { maxWidth: 196, align: 'justify' })

      doc.text('YOUR COOPERATION ON THIS MATTER IS HIGHLY APPRECIATED.', 10, newY + 14)

      if (progressFlowDisplayListPage4.length > 0) {
        pageNum = 'Page 3'
        const pageNumWidth = getTextWidth(pageNum, 7)
        const pageNumWidthX = (pageWidth - pageNumWidth) / 2
        doc.setFont('helvetica', 'italic')
        doc.text(pageNum, pageNumWidthX, 192 + 72)

        doc.addPage('legal')

        doc.setFont('times', 'normal')
        doc.setFontSize(14)
        doc.text(republicText, republicTextX, 10)
        doc.setFont('times', 'bold')
        doc.setFontSize(16)
        doc.text(officeText, officeTextX, 17)
        doc.setFont('times', 'normal')
        doc.setFontSize(14)
        doc.text(cityText, cityTextX, 23)

        doc.addImage(lungsodLink.href, 'PNG', 7, 2, 30, 30, 'lungsod', 'NONE', 0)
        doc.addImage(ocboLink.href, 'PNG', pageWidth - 36, 2, 29, 29, 'ocbo', 'NONE', 0)

        doc.setLineWidth(0.9)
        doc.line(10, 34, pageWidth - 10, 34)

        doc.setFontSize(10)
        doc.setFont('helvetica', 'normal')
        doc.text('Application No.: ', 10, 40)
        const appWidth = getTextWidth('Application No.: ', 10)
        doc.setFont('helvetica', 'bold')
        doc.text(applicationNo.value, appWidth + 10, 40)

        doc.setFont('helvetica', 'normal')
        const dateWidth = getTextWidth(today, 10)
        doc.text(today, pageWidth - dateWidth * 1.6, 40)

        doc.setFont('helvetica', 'bold')
        const findingsWidth = getTextWidth('FINDINGS AND RECOMMENDATIONS', 16)
        const findingsWidthX = (pageWidth - findingsWidth) / 2
        doc.text('FINDINGS AND RECOMMENDATIONS', findingsWidthX, 52)
        // doc.setLineWidth(0.2)
        // doc.line(63, 53, 154, 53)

        doc.setFontSize(12)
        doc.setFont('helvetica', 'bold')
        doc.text(fName.toUpperCase(), 10, 64)

        doc.setFont('helvetica', 'normal')
        doc.text(faddress.toUpperCase(), 10, 70)

        doc.setFont('helvetica', 'bold')
        const attentionWidth = getTextWidth('ATTENTION', 14)
        const attentionWidthX = (pageWidth - attentionWidth) / 2
        const concernWidth = getTextWidth('CONCERNED DESIGNING ENGINEER/ARCHITECT', 12)
        const concernWidthX = (pageWidth - concernWidth) / 2
        doc.setFontSize(14)
        doc.text('ATTENTION', attentionWidthX, 88)
        doc.setFontSize(12)
        doc.text('CONCERNED DESIGNING ENGINEER/ARCHITECT', concernWidthX, 94)
        // doc.setLineWidth(0.2)
        // doc.line(71, 83, 175, 83)

        doc.setFontSize(11)
        doc.setFont('helvetica', 'normal')
        doc.text('Sir/Madam:', 10, 106)

        let startY = 112
        let currentX = 10

        doc.setFont('helvetica', 'normal')
        const sentence = '    Please be informed that as per evaluation of your '
        const sentence2 = ' PERMIT application, including attached documents and plans for the proposed '
        const sentence3 = ' structure, located at '
        const sentence4 = ', revealed the following deficiencies pursuant to Section 302 of the National Building Code of the Philippines (PD 1096) with its revised implementing rules and regulations, to wit;'

        doc.setFont('helvetica', 'normal')
        const paragraph = sentence + permitType + sentence2 + occupancyType + sentence3 + flocation.toUpperCase() + sentence4

        doc.text(paragraph, currentX, startY, { maxWidth: 196, align: 'justify' })

        let y = startY + 24
        doc.setFontSize(10)

        for (let i = 0; i < progressFlowDisplayListPage4.length; i++) {
          doc.setFont('helvetica', 'bold')
          doc.text(progressFlowDisplayListPage4[i], 10, y)
          y += 5

          const actionLines = actionDisplayListPage4[i].split('\n')

          for (let j = 0; j < actionLines.length; j++) {
            doc.setFont('helvetica', 'normal')
            doc.text(actionLines[j], 16, y, { maxWidth: 190 })
            if (getTextWidth(actionLines[j], 10) > 186) y += 5
            y += 5
          }

          if (y >= 195) {
            progressFlowDisplayListPage5 = progressFlowDisplayListPage4.slice(i)
            actionDisplayListPage5 = actionDisplayListPage4.slice(i)
            break
          }
        }

        const newY = y + 6
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(9)
        const footer1 = '      IN VIEW OF HEREOF, YOU ARE HEREBY DIRECTED TO COMPLY AND RECTIFY THE ABOVE-STATED DEFICIENCIES WITHIN'
        const coloredFooter = 'THIRTY (30) CALENDAR DAYS'
        const footer2 = 'UPON RECEIPT HEREOF. FOR NON-COMPLIANCE, THE CITY SHALL HAVE FILED AGAINST THE'
        const footer3 = 'SAID OWNER FOR VIOLATION OF PD 1096.'

        doc.text(footer1, 10, newY, { maxWidth: 196, align: 'justify' })
        doc.setTextColor(255, 0, 0)
        doc.text(coloredFooter, 10, newY + 4)

        doc.setTextColor(0, 0, 0)
        doc.text(footer2, 58, newY + 4, { maxWidth: 196, align: 'justify' })
        doc.text(footer3, 10, newY + 8, { maxWidth: 196, align: 'justify' })

        doc.text('YOUR COOPERATION ON THIS MATTER IS HIGHLY APPRECIATED.', 10, newY + 14)

        if (progressFlowDisplayListPage5.length > 0) {
          pageNum = 'Page 4'
          const pageNumWidth = getTextWidth(pageNum, 7)
          const pageNumWidthX = (pageWidth - pageNumWidth) / 2
          doc.setFont('helvetica', 'italic')
          doc.text(pageNum, pageNumWidthX, 192 + 72)

          doc.addPage('legal')

          doc.setFont('times', 'normal')
          doc.setFontSize(14)
          doc.text(republicText, republicTextX, 10)
          doc.setFont('times', 'bold')
          doc.setFontSize(16)
          doc.text(officeText, officeTextX, 17)
          doc.setFont('times', 'normal')
          doc.setFontSize(14)
          doc.text(cityText, cityTextX, 23)

          doc.addImage(lungsodLink.href, 'PNG', 7, 2, 30, 30, 'lungsod', 'NONE', 0)
          doc.addImage(ocboLink.href, 'PNG', pageWidth - 36, 2, 29, 29, 'ocbo', 'NONE', 0)

          doc.setLineWidth(0.9)
          doc.line(10, 34, pageWidth - 10, 34)

          doc.setFontSize(10)
          doc.setFont('helvetica', 'normal')
          doc.text('Application No.: ', 10, 40)
          const appWidth = getTextWidth('Application No.: ', 10)
          doc.setFont('helvetica', 'bold')
          doc.text(applicationNo.value, appWidth + 10, 40)

          doc.setFont('helvetica', 'normal')
          const dateWidth = getTextWidth(today, 10)
          doc.text(today, pageWidth - dateWidth * 1.6, 40)

          doc.setFont('helvetica', 'bold')
          const findingsWidth = getTextWidth('FINDINGS AND RECOMMENDATIONS', 16)
          const findingsWidthX = (pageWidth - findingsWidth) / 2
          doc.text('FINDINGS AND RECOMMENDATIONS', findingsWidthX, 52)
          // doc.setLineWidth(0.2)
          // doc.line(63, 53, 154, 53)

          doc.setFontSize(12)
          doc.setFont('helvetica', 'bold')
          doc.text(fName.toUpperCase(), 10, 64)

          doc.setFont('helvetica', 'normal')
          doc.text(faddress.toUpperCase(), 10, 70)

          doc.setFont('helvetica', 'bold')
          const attentionWidth = getTextWidth('ATTENTION', 14)
          const attentionWidthX = (pageWidth - attentionWidth) / 2
          const concernWidth = getTextWidth('CONCERNED DESIGNING ENGINEER/ARCHITECT', 12)
          const concernWidthX = (pageWidth - concernWidth) / 2
          doc.setFontSize(14)
          doc.text('ATTENTION', attentionWidthX, 88)
          doc.setFontSize(12)
          doc.text('CONCERNED DESIGNING ENGINEER/ARCHITECT', concernWidthX, 94)
          // doc.setLineWidth(0.2)
          // doc.line(71, 83, 175, 83)

          doc.setFontSize(11)
          doc.setFont('helvetica', 'normal')
          doc.text('Sir/Madam:', 10, 106)

          let startY = 112
          let currentX = 10

          doc.setFont('helvetica', 'normal')
          const sentence = '    Please be informed that as per evaluation of your '
          const sentence2 = ' PERMIT application, including attached documents and plans for the proposed '
          const sentence3 = ' structure, located at '
          const sentence4 = ', revealed the following deficiencies pursuant to Section 302 of the National Building Code of the Philippines (PD 1096) with its revised implementing rules and regulations, to wit;'

          doc.setFont('helvetica', 'normal')
          const paragraph = sentence + permitType + sentence2 + occupancyType + sentence3 + flocation.toUpperCase() + sentence4

          doc.text(paragraph, currentX, startY, { maxWidth: 196, align: 'justify' })

          let y = startY + 24
          doc.setFontSize(10)

          for (let i = 0; i < progressFlowDisplayListPage5.length; i++) {
            doc.setFont('helvetica', 'bold')
            doc.text(progressFlowDisplayListPage5[i], 10, y)
            y += 5

            const actionLines = actionDisplayListPage5[i].split('\n')

            for (let j = 0; j < actionLines.length; j++) {
              doc.setFont('helvetica', 'normal')
              doc.text(actionLines[j], 16, y, { maxWidth: 190 })
              if (getTextWidth(actionLines[j], 10) > 186) y += 5
              y += 5
            }

            // if (y >= 195 ) {
            //   progressFlowDisplayListPage3 = progressFlowDisplayListPage2.slice(i)
            //   actionDisplayListPage3 = actionDisplayListPage2.slice(i)
            //   break
            // }
          }

          const newY = y + 6
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(9)
          const footer1 = '      IN VIEW OF HEREOF, YOU ARE HEREBY DIRECTED TO COMPLY AND RECTIFY THE ABOVE-STATED DEFICIENCIES WITHIN'
          const coloredFooter = 'THIRTY (30) CALENDAR DAYS'
          const footer2 = 'UPON RECEIPT HEREOF. FOR NON-COMPLIANCE, THE CITY SHALL HAVE FILED AGAINST THE'
          const footer3 = 'SAID OWNER FOR VIOLATION OF PD 1096.'

          doc.text(footer1, 10, newY, { maxWidth: 196, align: 'justify' })
          doc.setTextColor(255, 0, 0)
          doc.text(coloredFooter, 10, newY + 4)

          doc.setTextColor(0, 0, 0)
          doc.text(footer2, 58, newY + 4, { maxWidth: 196, align: 'justify' })
          doc.text(footer3, 10, newY + 8, { maxWidth: 196, align: 'justify' })

          doc.text('YOUR COOPERATION ON THIS MATTER IS HIGHLY APPRECIATED.', 10, newY + 14)

          doc.setFont('helvetica', 'normal')
          doc.text('Very truly yours,', 140, newY + 22)
          doc.setFont('helvetica', 'bold')
          doc.text('ARCH. KHASHAYAR L. TOGHYANI', 140, newY + 36)
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(9)
          doc.text('Officer-in-Charge', 161, newY + 40)

          doc.setFontSize(11)
          doc.setFont('helvetica', 'bold')
          doc.text('ENGR. MARIALITA G. AMPER', 145, newY + 54)
          doc.setFontSize(9)
          doc.setFont('helvetica', 'normal')
          doc.text('Processing and Evaluation Division Chief', 144, newY + 58)

          const postFooter = "2nd Level, City Engineer's Building, Pichon St. fronting Bonifacio Rotunda, Davao City"
          const postFooter2 = '(082) 291-6695'
          const postFooter3 = 'obo@davaocity.gov.ph, ocbo.davao@gmail.com'
          const postFooterPara = 'Address: ' + postFooter + '  Contact: ' + postFooter2 + '  Emails: ' + postFooter3
          const postFooterWidth = getTextWidth(postFooterPara, 7)
          const postFooterWidthX = (pageWidth - postFooterWidth) / 2
          doc.setFont('helvetica', 'italic')
          doc.text(postFooterPara, postFooterWidthX, newY + 72)

          pageNum = 'Page 5'
          const pageNumWidth2 = getTextWidth(pageNum, 7)
          const pageNumWidthX2 = (pageWidth - pageNumWidth2) / 2
          doc.setFont('helvetica', 'italic')
          doc.text(pageNum, pageNumWidthX2, newY + 78)
        } else {
          doc.setFontSize(11)
          doc.setFont('helvetica', 'normal')
          doc.text('Very truly yours,', 140, newY + 22)
          doc.setFont('helvetica', 'bold')
          doc.text('ARCH. KHASHAYAR L. TOGHYANI', 140, newY + 36)
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(9)
          doc.text('Officer-in-Charge', 161, newY + 40)

          doc.setFontSize(11)
          doc.setFont('helvetica', 'bold')
          doc.text('ENGR. MARIALITA G. AMPER', 145, newY + 54)
          doc.setFontSize(9)
          doc.setFont('helvetica', 'normal')
          doc.text('Processing and Evaluation Division Chief', 144, newY + 58)

          const postFooter = "2nd Level, City Engineer's Building, Pichon St. fronting Bonifacio Rotunda, Davao City"
          const postFooter2 = '(082) 291-6695'
          const postFooter3 = 'obo@davaocity.gov.ph, ocbo.davao@gmail.com'
          const postFooterPara = 'Address: ' + postFooter + '  Contact: ' + postFooter2 + '  Emails: ' + postFooter3
          const postFooterWidth = getTextWidth(postFooterPara, 7)
          const postFooterWidthX = (pageWidth - postFooterWidth) / 2
          doc.setFont('helvetica', 'italic')
          doc.text(postFooterPara, postFooterWidthX, newY + 72)

          pageNum = 'Page 4'
          const pageNumWidth = getTextWidth(pageNum, 7)
          const pageNumWidthX = (pageWidth - pageNumWidth) / 2
          doc.setFont('helvetica', 'italic')
          doc.text(pageNum, pageNumWidthX, newY + 78)
        }
      } else {
        doc.setFontSize(11)
        doc.setFont('helvetica', 'normal')
        doc.text('Very truly yours,', 140, newY + 22)
        doc.setFont('helvetica', 'bold')
        doc.text('ARCH. KHASHAYAR L. TOGHYANI', 140, newY + 36)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)
        doc.text('Officer-in-Charge', 161, newY + 40)

        doc.setFontSize(11)
        doc.setFont('helvetica', 'bold')
        doc.text('ENGR. MARIALITA G. AMPER', 145, newY + 54)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        doc.text('Processing and Evaluation Division Chief', 144, newY + 58)

        const postFooter = "2nd Level, City Engineer's Building, Pichon St. fronting Bonifacio Rotunda, Davao City"
        const postFooter2 = '(082) 291-6695'
        const postFooter3 = 'obo@davaocity.gov.ph, ocbo.davao@gmail.com'
        const postFooterPara = 'Address: ' + postFooter + '  Contact: ' + postFooter2 + '  Emails: ' + postFooter3
        const postFooterWidth = getTextWidth(postFooterPara, 7)
        const postFooterWidthX = (pageWidth - postFooterWidth) / 2
        doc.setFont('helvetica', 'italic')
        doc.text(postFooterPara, postFooterWidthX, newY + 72)

        pageNum = 'Page 3'
        const pageNumWidth = getTextWidth(pageNum, 7)
        const pageNumWidthX = (pageWidth - pageNumWidth) / 2
        doc.setFont('helvetica', 'italic')
        doc.text(pageNum, pageNumWidthX, newY + 78)
      }
    } else {
      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      doc.text('Very truly yours,', 140, newY + 22)
      doc.setFont('helvetica', 'bold')
      doc.text('ARCH. KHASHAYAR L. TOGHYANI', 140, newY + 36)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.text('Officer-in-Charge', 161, newY + 40)

      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text('ENGR. MARIALITA G. AMPER', 145, newY + 54)
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.text('Processing and Evaluation Division Chief', 144, newY + 58)

      const postFooter = "2nd Level, City Engineer's Building, Pichon St. fronting Bonifacio Rotunda, Davao City"
      const postFooter2 = '(082) 291-6695'
      const postFooter3 = 'obo@davaocity.gov.ph, ocbo.davao@gmail.com'
      const postFooterPara = 'Address: ' + postFooter + '  Contact: ' + postFooter2 + '  Emails: ' + postFooter3
      const postFooterWidth = getTextWidth(postFooterPara, 7)
      const postFooterWidthX = (pageWidth - postFooterWidth) / 2
      doc.setFont('helvetica', 'italic')
      doc.text(postFooterPara, postFooterWidthX, newY + 72)

      pageNum = 'Page 2'
      const pageNumWidth = getTextWidth(pageNum, 7)
      const pageNumWidthX = (pageWidth - pageNumWidth) / 2
      doc.setFont('helvetica', 'italic')
      doc.text(pageNum, pageNumWidthX, newY + 78)
    }
  } else {
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.text('Very truly yours,', 140, newY + 22)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text('ARCH. KHASHAYAR L. TOGHYANI', 140, newY + 36)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text('Officer-in-Charge', 161, newY + 40)

    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('ENGR. MARIALITA G. AMPER', 145, newY + 54)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text('Processing and Evaluation Division Chief', 144, newY + 58)

    const postFooter = "2nd Level, City Engineer's Building, Pichon St. fronting Bonifacio Rotunda, Davao City"
    const postFooter2 = '(082) 291-6695'
    const postFooter3 = 'obo@davaocity.gov.ph, ocbo.davao@gmail.com'
    const postFooterPara = 'Address: ' + postFooter + '  Contact: ' + postFooter2 + '  Emails: ' + postFooter3
    const postFooterWidth = getTextWidth(postFooterPara, 7)
    const postFooterWidthX = (pageWidth - postFooterWidth) / 2
    doc.setFont('helvetica', 'italic')
    doc.text(postFooterPara, postFooterWidthX, newY + 72)
  }

  doc.save('NTC(' + applicationNo.value + ')')
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const activate = async () => {
  quasar.loading.show({
    spinner: QSpinnerOrbit,
  })

  if (await checkConnection()) {
    if (await checkExist(applicationNo.value)) {
      today = await generateDate()
      await getNTCData(applicationNo.value)
      await getProgressFlow(applicationNo.value)
      await createPDF2()
      // await createPDF()
      clearProgressFlow()
    } else {
      alert.value = true
      alertMessage.value = `'${applicationNo.value}' does not exist`
    }
  } else {
    alert.value = true
    alertMessage.value = 'No Connection on Server'
  }

  quasar.loading.hide()
}

// const formatInput = (evt: Event) => {
//   const target = evt.target as HTMLInputElement
//   const value = target.value

//   if (value === '') {
//     return
//   }

//   const numberValue = Number(value.replace(/-/g, ''))
//   const hasNumber = /\d/.test(value)
//   if (isNaN(numberValue)) {
//     target.value = hasNumber ? target.value.slice(0, -1) : ''
//   }

//   if (value.length === 2) {
//     target.value += '-'
//     return
//   }
// }
</script>

<style lang="sass" scoped>

.input
  padding: 10px
  border-radius: 20px
  border: 1px solid #ccc
  background-color: white
  text-align: center
  width: 20rem
  outline: none
  font-size: 1.2rem
  margin-bottom: 1rem

.button
  padding: 1rem 2.2rem
  border: 2px solid #1a237e
  border-radius: 10px
  background-color: #1a237e
  color: white
  font-size: 18px
  text-align: center
  text-decoration: none
  cursor: pointer
  display: inline-block

.alert
  background-color: #010b15
  color: #e2e8ed
  border: #e2e8ed solid 2px

.alert-title
  font-size: 3rem

.alert-message
  font-size: 1.4rem
  padding: 3rem
</style>
