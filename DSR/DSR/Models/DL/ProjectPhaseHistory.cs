//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DSR.Models.DL
{
    using System;
    using System.Collections.Generic;
    
    public partial class ProjectPhaseHistory
    {
        public int PhaseID { get; set; }
        public Nullable<int> ProjectId { get; set; }
        public Nullable<int> DsrId { get; set; }
        public string PhaseName { get; set; }
        public Nullable<System.DateTime> PlnSrtDate { get; set; }
        public Nullable<System.DateTime> ActSrtDate { get; set; }
        public Nullable<System.DateTime> PlnEndDate { get; set; }
        public Nullable<System.DateTime> ActEndDate { get; set; }
        public string CompletionPer { get; set; }
        public string AuditStatus { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
    }
}
