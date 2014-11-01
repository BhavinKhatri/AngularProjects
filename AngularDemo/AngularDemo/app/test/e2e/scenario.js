describe ('Employee app',function() {
    describe('Employee',function(){
        beforeEach (function(){
            browser().navigateTo('/Home/Employee');

        } );
        it('should render the employee page', function () {
            expect(element('h2:first').text().toMatch('/Employee/'));
            expect(element('h3:second').text().toMatch('/Create Employee/'));
           // expect(Element('label:name').text().toMatch('/Name'));
            input('Employee.Name').enter('Jack');
            //expect(Element('label:name').text().toMatch('/Name'));
            select('Employee.Salary').enter('30000');
           select('Employee.Age').enter('23');
           select('Employee.Gender').enter('Male');
            element(':button.btn').click();

       });
    })

});

