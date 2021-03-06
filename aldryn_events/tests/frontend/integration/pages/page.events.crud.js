/*!
 * @author:    Divio AG
 * @copyright: http://www.divio.ch
 */

'use strict';
/* global by, element, expect */

// #############################################################################
// INTEGRATION TEST PAGE OBJECT

var cmsProtractorHelper = require('cms-protractor-helper');

var eventsPage = {
    site: 'http://127.0.0.1:8000/en/',

    // log in, log out
    editModeLink: element(by.css('.inner a[href="/?edit"]')),
    usernameInput: element(by.id('id_cms-username')),
    passwordInput: element(by.id('id_cms-password')),
    loginButton: element(by.css('.cms_form-login input[type="submit"]')),
    userMenus: element.all(by.css('.cms_toolbar-item-navigation > li > a')),

    // adding new page
    userMenuDropdown: element(by.css(
        '.cms_toolbar-item-navigation-hover')),
    administrationOptions: element.all(by.css(
        '.cms_toolbar-item-navigation a[href="/en/admin/"]')),
    sideMenuIframe: element(by.css('.cms_sideframe-frame iframe')),
    pagesLink: element(by.css('.model-page > th > a')),
    addPageLink: element(by.css('.sitemap-noentry .addlink')),
    titleInput: element(by.id('id_title')),
    slugErrorNotification: element(by.css('.errors.slug')),
    saveButton: element(by.css('.submit-row [name="_save"]')),
    editPageLink: element(by.css('.col1 [href*="preview/"]')),
    testLink: element(by.css('.selected a')),

    // adding new apphook config
    eventsConfigsLink: element(by.css('.model-eventsconfig > th > a')),
    editEventsConfigsLink: element(by.css('.row1 > th > a')),
    addEventsConfigsButton: element(by.css('.object-tools .addlink')),
    namespaceInput: element(by.id('id_namespace')),
    applicationTitleInput: element(by.id('id_app_title')),

    // adding new event
    breadcrumbsLinks: element.all(by.css('.breadcrumbs a')),
    addEventLink: element(by.css('.model-event .addlink')),
    startDateLinks: element.all(by.css('.field-start_date a')),
    startTimeLinks: element.all(by.css(
        '.field-start_time > .datetimeshortcuts > a')),
    endDateInput: element(by.id('id_end_date')),
    endTimeInput: element(by.id('id_end_time')),
    successNotification: element(by.css('.messagelist .success')),
    editEventLinks: element.all(by.css(
        '.results th > [href*="/aldryn_events/event/"]')),

    // adding event to the page
    advancedSettingsOption: element(by.css(
        '.cms_toolbar-item-navigation [href*="advanced-settings"]')),
    modalIframe: element(by.css('.cms_modal-frame iframe')),
    applicationSelect: element(by.id('application_urls')),
    eventsOption: element(by.css('option[value="EventListAppHook"]')),
    saveModalButton: element(by.css('.cms_modal-buttons .cms_btn-action')),
    eventMetaBlock: element(by.css('.aldryn-events-meta')),
    eventsCalendarBlock: element(by.css('.aldryn-events-calendar')),
    eventLink: element(by.css('.aldryn-events-list h2 > a')),
    backToOverviewLink: element(by.css('.pager-back a')),

    // deleting event
    deleteButton: element(by.css('.deletelink-box a')),
    sidebarConfirmationButton: element(by.css('#content [type="submit"]')),

    cmsLogin: function (credentials) {
        // object can contain username and password, if not set it will
        // fallback to 'admin'
        credentials = credentials ||
            { username: 'admin', password: 'admin' };

        eventsPage.usernameInput.clear();

        // fill in email field
        return eventsPage.usernameInput.sendKeys(credentials.username)
            .then(function () {
            eventsPage.passwordInput.clear();

            // fill in password field
            return eventsPage.passwordInput.sendKeys(credentials.password);
        }).then(function () {
            eventsPage.loginButton.click();

            // wait for user menu to appear
            cmsProtractorHelper.waitFor(eventsPage.userMenus.first());

            // validate user menu
            expect(eventsPage.userMenus.first().isDisplayed()).toBeTruthy();
        });
    }

};

module.exports = eventsPage;
