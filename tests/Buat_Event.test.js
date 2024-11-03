const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
require('@testing-library/jest-dom');
const { screen } = require('@testing-library/dom');

describe('Buat Event Form', () => {
    let dom;
    let container;

    beforeAll(() => {
        // Baca file HTML `Buat_Event.ejs`
        const filePath = path.resolve(__dirname, '../views/Buat_Event/index.ejs');
        const html = fs.readFileSync(filePath, 'utf8');
        dom = new JSDOM(html);
        container = dom.window.document.body;
    });

    test('should have a form with action /buat-event and method post', () => {
        const form = container.querySelector('form');
        expect(form).toHaveAttribute('action', '/buat-event');
        expect(form).toHaveAttribute('method', 'post');
    });

    test('should have an input for event name with required attribute', () => {
        const namaEventInput = container.querySelector('input[name="nama_event"]');
        expect(namaEventInput).toBeInTheDocument();
        expect(namaEventInput).toHaveAttribute('required');
    });

    test('should have a textarea for event description with required attribute', () => {
        const deskripsiEventTextarea = container.querySelector('textarea[name="deskripsi_event"]');
        expect(deskripsiEventTextarea).toBeInTheDocument();
        expect(deskripsiEventTextarea).toHaveAttribute('required');
    });

    test('should have an input for penyelenggara event with required attribute', () => {
        const penyelenggaraEventInput = container.querySelector('input[name="penyelenggara_event"]');
        expect(penyelenggaraEventInput).toBeInTheDocument();
        expect(penyelenggaraEventInput).toHaveAttribute('required');
    });

    test('should have checkboxes for required divisions', () => {
        const divisiCheckboxes = container.querySelectorAll('input[name="divisi[]"]');
        expect(divisiCheckboxes.length).toBeGreaterThan(0);
        expect(divisiCheckboxes[0]).toHaveAttribute('type', 'checkbox');
    });

    test('should have a textarea for benefits of the event', () => {
        const benefitTextarea = container.querySelector('textarea[name="benefit_event"]');
        expect(benefitTextarea).toBeInTheDocument();
    });

    test('should have inputs for datetime for kepanitiaan and event schedules', () => {
        const kepanitiaanMulai = container.querySelector('input[name="kepanitiaan_mulai"]');
        const kepanitiaanSelesai = container.querySelector('input[name="kepanitiaan_selesai"]');
        const eventMulai = container.querySelector('input[name="event_mulai"]');
        const eventSelesai = container.querySelector('input[name="event_selesai"]');

        expect(kepanitiaanMulai).toBeInTheDocument();
        expect(kepanitiaanMulai).toHaveAttribute('type', 'datetime-local');

        expect(kepanitiaanSelesai).toBeInTheDocument();
        expect(kepanitiaanSelesai).toHaveAttribute('type', 'datetime-local');

        expect(eventMulai).toBeInTheDocument();
        expect(eventMulai).toHaveAttribute('type', 'datetime-local');

        expect(eventSelesai).toBeInTheDocument();
        expect(eventSelesai).toHaveAttribute('type', 'datetime-local');
    });

    test('should have a button to submit the form', () => {
        const submitButton = container.querySelector('button[type="submit"]');
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toHaveTextContent('Buat Event');
    });
});
