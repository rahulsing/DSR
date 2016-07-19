using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DSR.Models.DL;
using DSR.Models;

namespace DSR.Controllers
{
    public class DSRController : ApiController
    {
        private DSRdbEntities db = new DSRdbEntities();
        // GET api/dsr
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/dsr/5
        public DailyDSRVM Get(int id)
        {
            Project project = db.Projects.Find(id);
            

            //if (project == null)
            //{
            //    throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            //}
            //else
            //{
            //    DSRMaster objDSRMaster = (from dsr in db.DSRMasters
            //                              where dsr.ProjectId == id
            //                              orderby dsr.DSRDate
            //                              select dsr).First();
            //    if (objDSRMaster == null)
            //    {
            //        //the default with empty records
            //    }
            //}

            DailyDSRVM objDailyDSRVM = new DailyDSRVM()
            {
                accomplishment = new List<Accomplishment>() { new Accomplishment(){Activity="test1",ActivityId=1},
                new Accomplishment(){Activity="test2",ActivityId=2} },
                phases = new List<ProjectPhase>() { new ProjectPhase() { PhaseName = "First", PlnSrtDate = DateTime.Now }, new ProjectPhase() { PhaseName = "First2", PlnSrtDate = DateTime.Now.AddDays(20) } },
                projectId=1
            };


            //return project;
            //return "value";
            return objDailyDSRVM;
        }

        // POST api/dsr
        public void Post(DailyDSRVM dsrvm)
        {
            //DailyDSRVM objDailyDSRVM=dsrvm;
           
            DSRMaster dsrmaster = new DSRMaster() { ProjectId = dsrvm.projectId, Status = dsrvm.projectStatus,DSRDate=DateTime.Now,Issue=0,OpenItem=0,Risk=0,SentBy="Rahul"};
            db.DSRMasters.Add(dsrmaster);
            db.SaveChanges();

            int? dsrId = dsrmaster.DSRId;

            
            dsrvm.accomplishment.ForEach(a=>db.Accomplishments.Add(a));
            
            dsrvm.phases.ForEach(o => o.DsrId = dsrId);
            dsrvm.phases.ForEach(o => db.ProjectPhases.Add(o));
            db.SaveChanges();
            //db.Accomplishments.Add(dsrvm.accomplishment);
        }

        // PUT api/dsr/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/dsr/5
        public void Delete(int id)
        {
        }
    }
}
